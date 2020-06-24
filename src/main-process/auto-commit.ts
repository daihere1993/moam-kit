import { ipcMain } from 'electron';
import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import * as path from 'path';
import * as fs from 'fs';
import * as shell from 'shelljs';
import * as cheerio from 'cheerio';
import { ChildProcess } from 'child_process';
import { interval, Observable, forkJoin, from, Subject, of } from 'rxjs';
import { mergeMap, takeUntil, catchError, map } from 'rxjs/operators';
import * as utils from './utils';
import config from './config';
import {
  AutoCommitInfo,
  IPCResponse,
  ProcessStatus,
  ProcessExecInfo,
  IPCMessage,
  IPCRequest,
  DiffInfo,
} from '../common/types';

const _config = config.AutoCommit;
const DATA_PATH = utils.getUserDataPath();
const COMMIT_MSG_PATH = path.join(DATA_PATH, _config.COMMIT_MESSAGE_FILE_NAME);

export enum ProcessCollection {
  CHECK_SVN_STATUS = 'check SVN status for target component',
  FORM_COMMIT_MESSAGE = 'form commit message',
  DOWNLOAD_DIFF = 'download diff from review board',
  COMMIT_CODE_BY_SVN_COMMANDS = 'commit code by SVN commands',
}

export interface IPCError extends Error {
  res?: IPCResponse;
}

export class AutoCommit {
  public processExecInfo: ProcessExecInfo[] = [];

  private componentName: string;

  private branchName: string;

  private shellProcess: ChildProcess;

  public startup() {
    this.subscribeIPCEvent();
  }

  private subscribeIPCEvent(): void {
    ipcMain.on(IPCMessage.PREPARE_DIFF_REQ, (event, { data }: IPCRequest<AutoCommitInfo>) => {
      this.getPreparedDiff$(data).subscribe(
        (diffInfo) => {
          const res: IPCResponse = { isSuccessed: true, data: diffInfo };
          event.reply(IPCMessage.PREPARE_DIFF_RES, res);
        },
        (err: IPCError) => {
          if (err.res) {
            event.reply(IPCMessage.PREPARE_DIFF_RES, err.res);
          } else {
            throw new Error(
              `There is no right error handle in ${IPCMessage.PREPARE_DIFF_RES}: ${err.message}`,
            );
          }
        },
      );
    });

    ipcMain.on(IPCMessage.PREPARE_COMMIT_MSG_REQ, (event, { data }: IPCRequest<AutoCommitInfo>) => {
      this.prepareCommitMsg$(data).subscribe(
        (commitMsg) => {
          const res: IPCResponse = { isSuccessed: false, data: commitMsg };
          event.reply(IPCMessage.PREPARE_COMMIT_MSG_RES, res);
        },
        (err: IPCError) => {
          if (err.res) {
            event.reply(IPCMessage.PREPARE_COMMIT_MSG_RES, err.res);
          } else {
            throw new Error(
              `There is no right error handle in ${IPCMessage.PREPARE_COMMIT_MSG_RES}: ${err.message}`,
            );
          }
        },
      );
    });

    let cancelStatusCheckInterval = new Subject<void>();
    ipcMain.on(IPCMessage.AUTO_COMMIT_REQ, (event, { data }: IPCRequest<AutoCommitInfo>) => {
      this.branchName = data.branch.name;
      this.componentName = data.component ? data.component.name : 'MOAM';
      this.toCheckMOAMStatus$(event)
        .pipe(
          mergeMap((isUnlocked) => {
            if (isUnlocked) {
              return this.onMOAMUnlocked$(data);
            }
            if (!cancelStatusCheckInterval) {
              cancelStatusCheckInterval = new Subject<void>();
            }
            return this.looping(event, data, cancelStatusCheckInterval);
          }),
        )
        .subscribe(
          (res) => {
            if (res) {
              event.reply(IPCMessage.REPLY_AUTO_COMMIT_REQ, res);
              cancelStatusCheckInterval.next();
              cancelStatusCheckInterval.complete();
              cancelStatusCheckInterval = undefined;
            }
          },
          (err: IPCError) => {
            if (err.res) {
              event.reply(IPCMessage.REPLY_AUTO_COMMIT_REQ, err.res);
            } else {
              throw new Error('There is no prepared res for target error.');
            }
          },
        );
    });

    ipcMain.on(IPCMessage.STOP_AUTO_COMMIT, (event) => {
      if (cancelStatusCheckInterval) {
        cancelStatusCheckInterval.next();
        cancelStatusCheckInterval.complete();
        cancelStatusCheckInterval = undefined;
      }
      if (this.shellProcess) {
        this.shellProcess.kill();
      }
      const res: IPCResponse = { isSuccessed: true };
      event.reply(IPCMessage.REPLY_STOP_AUTO_COMMIT, res);
    });
  }

  private getSourceURL(branchName: string): string {
    switch (branchName) {
      case 'trunk':
        return `http://maddash.nsn-net.net/api/1/jenkins/lte_trunk/jobs/MOAM+${branchName}.STATUS`;
      case 'SBTS20B':
        return `http://maddash.nsn-net.net/api/1/jenkins/sbts20b/jobs/MOAM+${branchName}.STATUS`;
      default:
        return `${_config.SVN_STATUS_BASED_URL}${branchName}svn.html?_=${new Date().getTime()}`;
    }
  }

  private isSpecificBranch(branchName: string): boolean {
    return branchName === 'trunk' || branchName === 'SBTS20B';
  }

  private toCheckMOAMStatus$(event?: Electron.IpcMainEvent): Observable<boolean> {
    const url = this.getSourceURL(this.branchName);
    const requestConfig: any = {};
    const pInfo: ProcessExecInfo = {
      name: ProcessCollection.CHECK_SVN_STATUS,
      status: ProcessStatus.ONGOING,
    };
    this.processExecInfo.push(pInfo);

    if (!this.isSpecificBranch(this.branchName)) {
      requestConfig.headers = { Authorization: _config.REQUEST_AUTHORIZATION };
    }

    return from(axios.get(url, requestConfig)).pipe(
      catchError((err) => {
        const ipcError: IPCError = new Error(err.message);
        let errorMsg = err.message;
        if (err.code === 'ETIMEDOUT' || (err.response && err.response.status === 404)) {
          errorMsg = `Couldn't find corresponding branch info for "${this.branchName}"`;
        }
        const res: IPCResponse = {
          isSuccessed: false,
          error: {
            name: ProcessCollection.CHECK_SVN_STATUS,
            message: errorMsg,
          },
        };
        ipcError.res = res;
        pInfo.status = ProcessStatus.FAILED;
        pInfo.errorMsg = errorMsg;
        throw ipcError;
      }),
      map((res: AxiosResponse<any>) => {
        let isUnlocked: boolean;

        if (this.isSpecificBranch(this.branchName)) {
          isUnlocked = !res.data.data.lock.locked;
        } else {
          const $ = cheerio.load(res.data);
          const tdEls = $('tr > td:nth-child(1)');
          const compNode = Array.from(tdEls).find((el) => {
            return $(el).text().includes(this.componentName);
          });

          if (!compNode) {
            const errorMsg = `Couldn't find corresponding component status for "${this.componentName}"`;
            const ipcError: IPCError = new Error();
            ipcError.res = {
              isSuccessed: false,
              error: {
                name: ProcessCollection.CHECK_SVN_STATUS,
                message: errorMsg,
              },
            };
            pInfo.status = ProcessStatus.FAILED;
            pInfo.errorMsg = errorMsg;
            throw ipcError;
          }

          const compEl = $(compNode);
          const statusEl = compEl && $(compEl.next());
          isUnlocked = statusEl.text().includes('unlocked');
        }

        pInfo.status = ProcessStatus.DONE;
        pInfo.additionalData = { isLocked: isUnlocked };

        if (!isUnlocked && event) {
          event.reply(IPCMessage.AUTO_COMMIT_HEARTBEAT, {
            data: `[${moment().format()}] ${this.componentName}.${this.branchName} is locked`,
          });
        }

        return isUnlocked;
      }),
    );
  }

  private looping(
    event: Electron.IpcMainEvent,
    data: AutoCommitInfo,
    cancelInterval: Subject<void>,
  ): Observable<IPCResponse> {
    return interval(_config.INTERVAL_TIME)
      .pipe(
        mergeMap(() => this.toCheckMOAMStatus$(event)),
        mergeMap((isUnlocked) => {
          if (isUnlocked) {
            return this.onMOAMUnlocked$(data);
          }
          return of(undefined);
        }),
      )
      .pipe(takeUntil(cancelInterval));
  }

  private onMOAMUnlocked$(data: AutoCommitInfo): Observable<IPCResponse> {
    return forkJoin([this.getPreparedDiff$(data), this.prepareCommitMsg$(data)]).pipe(
      mergeMap(([diffPath]) => this.toCommitCode$(data, '')),
    );
  }

  private getPreparedDiff$(data: AutoCommitInfo): Observable<DiffInfo> {
    const urlToDLDiff = utils.getReviewBoardDiffURL(data.reviewBoardID);
    const diffPath$ = data.specificDiff ? of(data.specificDiff) : this.downLoadDiff$(urlToDLDiff);
    return diffPath$.pipe(
      map((diffPath) => {
        const amount = this.getChangedFiledAmount(fs.readFileSync(diffPath).toString());
        return {
          path: diffPath,
          changedAmount: amount,
        };
      }),
    );
  }

  private getChangedFiledAmount(diffContent: string): number {
    return diffContent.split('(working copy)').length - 1;
  }

  private downLoadDiff$(url: string): Observable<string> {
    const pInfo: ProcessExecInfo = {
      name: ProcessCollection.DOWNLOAD_DIFF,
      status: ProcessStatus.ONGOING,
    };
    this.processExecInfo.push(pInfo);
    return new Observable<string>((subscriber) => {
      axios({ method: 'get', url, responseType: 'stream' })
        .then((response) => {
          const diffPath = path.join(DATA_PATH, _config.DIFF_NAME);
          response.data.pipe(fs.createWriteStream(diffPath)).on('close', () => {
            pInfo.status = ProcessStatus.DONE;
            subscriber.next(diffPath);
            subscriber.complete();
          });
          return 0;
        })
        .catch((err) => {
          pInfo.status = ProcessStatus.FAILED;
          pInfo.errorMsg = err.message;
          subscriber.complete();
          throw err;
        });
    });
  }

  private prepareCommitMsg$(data: AutoCommitInfo): Observable<string> {
    const pInfo: ProcessExecInfo = {
      name: ProcessCollection.FORM_COMMIT_MESSAGE,
      status: ProcessStatus.ONGOING,
    };
    this.processExecInfo.push(pInfo);
    const msg = [
      `REFERENCE : PR ${data.prontoTitle}`,
      `PRODUCT : LTE`,
      `COMPLETED : YES`,
      `DESCRIPTION : ${data.description}`,
      `ACCEPTED_BY : RB ${data.reviewBoardID}`,
    ].join('\n');

    const stream = fs.createWriteStream(COMMIT_MSG_PATH);
    return new Observable<string>((subscriber) => {
      stream.on('close', () => {
        pInfo.status = ProcessStatus.DONE;
        pInfo.additionalData = msg;
        subscriber.next(msg);
        subscriber.complete();
      });
      stream.write(msg);
      stream.end();
    });
  }

  private toCommitCode$(data: AutoCommitInfo, diffPath: string): Observable<IPCResponse> {
    const pInfo: ProcessExecInfo = {
      name: ProcessCollection.COMMIT_CODE_BY_SVN_COMMANDS,
      status: ProcessStatus.ONGOING,
    };
    this.processExecInfo.push(pInfo);
    return new Observable<IPCResponse>((subscriber) => {
      this.shellProcess = shell
        .cd(data.branch.pcDir)
        .exec(
          `svn cleanup && svn revert -R . && svn up . && svn patch ${diffPath} && svn ci -F ${COMMIT_MSG_PATH}`,
          { async: true },
          (code, stdout, stderr) => {
            const res: IPCResponse = {};
            if (code === 0 && stdout.includes('Committed revision ')) {
              pInfo.status = ProcessStatus.DONE;
              pInfo.additionalData = stdout.split('\n').pop();
              res.isSuccessed = true;
              res.data = stdout;
            } else if (code === null) {
              pInfo.status = ProcessStatus.FAILED;
              pInfo.errorMsg = 'Process canceled.';
              res.isSuccessed = false;
              res.error = {
                name: IPCMessage.AUTO_COMMIT_REQ,
                message: pInfo.errorMsg,
              };
            } else {
              const errorMsg = code === 0 ? stdout : stderr;
              pInfo.status = ProcessStatus.FAILED;
              pInfo.errorMsg = errorMsg;
              res.isSuccessed = false;
              res.error = {
                name: IPCMessage.AUTO_COMMIT_REQ,
                message: errorMsg,
              };
            }
            subscriber.next(res);
            subscriber.complete();
          },
        );
    });
  }
}
