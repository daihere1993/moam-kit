import { IpcMainEvent } from 'electron';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as utils from '../utils';
import config from '../config';
import { AutoCommitInfo, IPCResponse, IPCMessage, IPCRequest, IPCError } from '../../common/types';
import IpcChannelInterface from '../ipc/ipc-channel.interface';

const _config = config.AutoCommit;
const DATA_PATH = utils.getUserDataPath() || '';

export default class DiffChannel implements IpcChannelInterface {
  name = IPCMessage.PREPARE_DIFF_REQ;

  handle(event: IpcMainEvent, request: IPCRequest<AutoCommitInfo>): void {
    this.getPreparedDiff(request.data).subscribe(
      (res) => {
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
  }

  private getPreparedDiff(data: AutoCommitInfo): Observable<IPCResponse> {
    const urlToDLDiff = utils.getReviewBoardDiffURL(data.reviewBoardID);
    const diffPath = data.specificDiff
      ? of(data.specificDiff)
      : this.downLoadDiff(urlToDLDiff, path.join(DATA_PATH, _config.DIFF_NAME));
    return diffPath.pipe(
      map((value) => {
        const amount = this.getChangedFiledAmount(fs.readFileSync(value).toString());
        const res: IPCResponse = {
          isSuccessed: true,
          data: {
            path: value,
            changedAmount: amount,
          },
        };
        return res;
      }),
    );
  }

  private getChangedFiledAmount(diffContent: string): number {
    return diffContent.split('(working copy)').length - 1;
  }

  private downLoadDiff(url: string, target: string): Observable<string> {
    return new Observable<string>((subscriber) => {
      axios
        .get(url, { responseType: 'stream' })
        .then((response) => {
          response.data.pipe(fs.createWriteStream(target)).on('close', () => {
            subscriber.next(target);
            subscriber.complete();
          });
          return 0;
        })
        .catch((err) => {
          subscriber.complete();
          throw err;
        });
    });
  }
}
