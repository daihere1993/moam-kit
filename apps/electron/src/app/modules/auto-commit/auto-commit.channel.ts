import * as path from 'path';
import * as cheerio from 'cheerio';
import * as shell from 'shelljs';
import axios, { AxiosResponse } from 'axios';
import {
  IPCMessage,
  IPCRequest,
  AutoCommitInfo,
  IPCError,
  ProcessCollection,
  IPCResponse,
} from '@moam-kit/types';
import { IpcMainEvent, ipcMain } from 'electron';
import { ChildProcess } from 'child_process';
import { Observable, from, Subject, of, timer } from 'rxjs';
import { catchError, map, mergeMap, takeUntil } from 'rxjs/operators';

import * as utils from '@electron/app/utils';
import { M_AutoCommit } from '@electron/app/constants';
import { IpcChannelInterface } from '@electron/app/interfaces';

const appDataPath = utils.getUserDataPath();
const COMMIT_MSG_PATH = path.join(appDataPath, M_AutoCommit.commitMessageFileName);

export default class AutoCommitChannel implements IpcChannelInterface {
  private shellProcess: ChildProcess;

  private cancelStatusCheckInterval: Subject<void>;

  name = IPCMessage.AUTO_COMMIT_REQ;

  constructor() {
    ipcMain.on(IPCMessage.STOP_AUTO_COMMIT, (event) => {
      if (this.cancelStatusCheckInterval) {
        this.cancelStatusCheckInterval.next();
        this.cancelStatusCheckInterval.complete();
        this.cancelStatusCheckInterval = undefined;
      }
      if (this.shellProcess) {
        this.shellProcess.kill();
      }
      const res: IPCResponse = { isSuccessed: true };
      event.reply(IPCMessage.REPLY_STOP_AUTO_COMMIT, res);
    });
  }

  handle(event: IpcMainEvent, request: IPCRequest<AutoCommitInfo>): void {
    const { data } = request;

    this.cancelStatusCheckInterval = new Subject<void>();

    this.loopToCheckLockInfo(data, this.cancelStatusCheckInterval).subscribe(
      (res) => {
        if (res) {
          event.reply(IPCMessage.REPLY_AUTO_COMMIT_REQ, res);
          this.cancelStatusCheckInterval.next();
          this.cancelStatusCheckInterval.complete();
          this.cancelStatusCheckInterval = undefined;
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
  }

  private hasUnlocked(branchName: string, componentName: string): Observable<boolean> {
    const url = this.getSourceURL(branchName);
    const requestConfig: any = {};

    if (!this.isSpecificBranch(branchName)) {
      requestConfig.headers = { Authorization: M_AutoCommit.requestAuthorization };
    }

    return from(axios.get(url, requestConfig)).pipe(
      catchError((err) => {
        const ipcError: IPCError = new Error(err.message);
        let errorMsg = err.message;
        if (err.code === 'ETIMEDOUT' || (err.response && err.response.status === 404)) {
          errorMsg = `Couldn't find corresponding branch info for "${branchName}"`;
        }
        const res: IPCResponse = {
          isSuccessed: false,
          error: {
            name: ProcessCollection.CHECK_SVN_STATUS,
            message: errorMsg,
          },
        };
        ipcError.res = res;
        throw ipcError;
      }),
      map((res: AxiosResponse<any>) => {
        let isUnlocked: boolean;

        if (this.isSpecificBranch(branchName)) {
          isUnlocked = !res.data.data.lock.locked;
        } else {
          const $ = cheerio.load(res.data);
          const tdEls = $('tr > td:nth-child(1)');
          const compNode = Array.from(tdEls).find((el) => {
            return $(el).text().includes(componentName);
          });

          if (!compNode) {
            const errorMsg = `Couldn't find corresponding component status for "${componentName}"`;
            const ipcError: IPCError = new Error();
            ipcError.res = {
              isSuccessed: false,
              error: {
                name: ProcessCollection.CHECK_SVN_STATUS,
                message: errorMsg,
              },
            };
            throw ipcError;
          }

          const compEl = $(compNode);
          const statusEl = compEl && $(compEl.next());
          isUnlocked = statusEl.text().includes('unlocked');
        }

        return isUnlocked;
      }),
    );
  }

  private isSpecificBranch(branchName: string): boolean {
    return branchName === 'trunk' || branchName === 'SBTS20B';
  }

  private getSourceURL(branchName: string): string {
    switch (branchName) {
      case 'trunk':
        return `http://maddash.nsn-net.net/api/1/jenkins/lte_trunk/jobs/MOAM+trunk.STATUS`;
      case 'SBTS20B':
        return `http://maddash.nsn-net.net/api/1/jenkins/sbts20b/jobs/MOAM+SBTS20B.STATUS`;
      default:
        return `${M_AutoCommit.svnStatusBasedUrl}${branchName}svn.html?_=${new Date().getTime()}`;
    }
  }

  private loopToCheckLockInfo(
    data: AutoCommitInfo,
    cancelInterval: Subject<void>,
  ): Observable<IPCResponse> {
    return timer(0, M_AutoCommit.checkStatusInterval).pipe(
      mergeMap(() =>
        this.hasUnlocked(data.branch.name, (data.component && data.component.name) || 'MOAM'),
      ),
      mergeMap((isUnlocked) => {
        if (isUnlocked) {
          return this.commitCode(data.branch.pcDir, data.diffPath);
        }
        return of();
      }),
      takeUntil(cancelInterval),
    );
  }

  private commitCode(pcDir: string, diffPath: string): Observable<IPCResponse> {
    return new Observable<IPCResponse>((subscriber) => {
      this.shellProcess = shell
        .cd(pcDir)
        .exec(
          `svn cleanup && svn revert -R . && svn up . && svn patch ${diffPath} && svn ci -F ${COMMIT_MSG_PATH}`,
          { async: true },
          (code, stdout, stderr) => {
            const res: IPCResponse = {};
            if (code === 0) {
              res.isSuccessed = true;
              res.data = stdout;
            } else if (code === null) {
              res.isSuccessed = false;
              res.error = {
                name: IPCMessage.AUTO_COMMIT_REQ,
                message: 'Process canceled.',
              };
            } else {
              const errorMsg = code === 0 ? stdout : stderr;
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
