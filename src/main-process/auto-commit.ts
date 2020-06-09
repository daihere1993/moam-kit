import { ipcMain } from 'electron';
import axios, { AxiosResponse } from 'axios';
import moment from 'moment';
import { config } from 'node-config-ts';
import * as path from 'path';
import * as fs from 'fs';
import * as shell from 'shelljs';
import * as cheerio from 'cheerio';
import { ChildProcess } from 'child_process';
import { interval, Observable, forkJoin, from, Subject, of } from 'rxjs';
import { mergeMap, takeUntil, catchError, map } from 'rxjs/operators';
import * as utils from '../common/utils';
import {
  AutoCommitInfo,
  IPCResponse,
  ProcessStatus,
  ProcessExecInfo,
  IPCMessage,
  IPCRequest,
} from '../common/types';

const _config = config.AutoCommit;
const DATA_PATH = utils.getUserDataPath();

export enum ProcessCollection {
  CHECK_SVN_STATUS = 'check SVN status for target component',
  FORM_COMMIT_MESSAGE = 'form commit message',
  DOWNLOAD_DIFF = 'download diff from review board',
  COMMIT_CODE_BY_SVN_COMMANDS = 'commit code by SVN commands',
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
    let cancelInterval = new Subject<void>();
    ipcMain.on(IPCMessage.AUTO_COMMIT_REQ, (event, { data }: IPCRequest<AutoCommitInfo>) => {
      this.branchName = data.branch.name;
      this.componentName = data.component ? data.component.name : 'MOAM';
      this.toCheckMOAMStatus$(event)
        .pipe(
          mergeMap((isUnlocked) => {
            if (isUnlocked) {
              return this.onMOAMUnlocked$(data);
            }
            if (!cancelInterval) {
              cancelInterval = new Subject<void>();
            }
            return this.looping(event, data, cancelInterval);
          }),
        )
        .subscribe(
          (res) => {
            if (res) {
              event.reply(IPCMessage.REPLY_AUTO_COMMIT_REQ, res);
              cancelInterval.next();
              cancelInterval.complete();
              cancelInterval = undefined;
            }
          },
          (err) => {
            console.log(err);
          },
        );
    });

    ipcMain.on(IPCMessage.STOP_AUTO_COMMIT, (event) => {
      if (cancelInterval) {
        cancelInterval.next();
        cancelInterval.complete();
        cancelInterval = undefined;
      }
      if (this.shellProcess) {
        this.shellProcess.kill();
      }
      const res: IPCResponse = { isSuccessed: true };
      event.reply(IPCMessage.REPLY_STOP_AUTO_COMMIT, res);
    });
  }

  private toCheckMOAMStatus$(event?: Electron.IpcMainEvent): Observable<boolean> {
    const pInfo: ProcessExecInfo = {
      name: ProcessCollection.CHECK_SVN_STATUS,
      status: ProcessStatus.ONGOING,
    };
    this.processExecInfo.push(pInfo);
    const url = `${_config.SVN_STATUS_BASED_URL}${
      this.branchName
    }svn.html?_=${new Date().getTime()}`;
    return from(
      axios.get(url, {
        headers: { Authorization: _config.REQUEST_AUTHORIZATION },
      }),
    ).pipe(
      catchError((err) => {
        pInfo.status = ProcessStatus.FAILED;
        pInfo.errorMsg = err.message;
        throw err;
      }),
      map((res: AxiosResponse<string>) => {
        const $ = cheerio.load(res.data);
        const tdEls = $('tr > td:nth-child(1)');
        const compNode = Array.from(tdEls).find((el) => {
          return $(el).text().includes(this.componentName);
        });

        if (!compNode) {
          pInfo.status = ProcessStatus.FAILED;
          pInfo.errorMsg = `Couldn't find corresponding component status: ${this.componentName}`;
          throw new Error(pInfo.errorMsg);
        }

        const compEl = $(compNode);
        const statusEl = compEl && $(compEl.next());
        const isUnlocked = statusEl.text().includes('unlocked');
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
    return forkJoin([this.toGetPreparedDiff$(data), this.formCommitMsg$(data)]).pipe(
      mergeMap(([diffPath, commitMsgPath]) => this.toCommitCode$(data, diffPath, commitMsgPath)),
    );
  }

  private toGetPreparedDiff$(data: AutoCommitInfo): Observable<string> {
    const downloadDiffUrl = utils.getReviewBoardDiffURL(data.reviewBoardID);
    return data.specificDiff ? of(data.specificDiff) : this.downLoadDiff$(downloadDiffUrl);
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

  private formCommitMsg$(data: AutoCommitInfo): Observable<string> {
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

    const filePath = path.join(DATA_PATH, _config.COMMIT_MESSAGE_FILE_NAME);
    const stream = fs.createWriteStream(filePath);
    return new Observable<string>((subscriber) => {
      stream.on('close', () => {
        pInfo.status = ProcessStatus.DONE;
        pInfo.additionalData = msg;
        subscriber.next(filePath);
        subscriber.complete();
      });
      stream.write(msg);
      stream.end();
    });
  }

  private toCommitCode$(
    data: AutoCommitInfo,
    diffPath: string,
    commitMsgPath: string,
  ): Observable<IPCResponse> {
    const pInfo: ProcessExecInfo = {
      name: ProcessCollection.COMMIT_CODE_BY_SVN_COMMANDS,
      status: ProcessStatus.ONGOING,
    };
    this.processExecInfo.push(pInfo);
    return new Observable<IPCResponse>((subscriber) => {
      this.shellProcess = shell
        .cd(data.branch.pcDir)
        .exec(
          `svn cleanup && svn revert -R . && svn up . && svn patch ${diffPath} && svn ci -F ${commitMsgPath}`,
          { async: true },
          (code, stdout, stderr) => {
            const res: IPCResponse = {};
            if (code === 0 && stdout.includes('Committed revision ')) {
              pInfo.status = ProcessStatus.DONE;
              pInfo.additionalData = stdout;
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
