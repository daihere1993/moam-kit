import { IpcMainEvent } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoCommitInfo, IPCResponse, IPCMessage, IPCRequest, IPCError } from '@moam-kit/types';
import * as utils from '@electron/app/utils';
import { M_AutoCommit } from '@electron/app/constants';
import { IpcChannelInterface } from '@electron/app/interfaces';

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
    const urlToDLDiff = utils.getReviewBoardDiffURLByRBId(data.reviewBoardID);
    const diffPath = data.specificDiff
      ? of(data.specificDiff)
      : utils.downLoadDiff(urlToDLDiff, path.join(DATA_PATH, M_AutoCommit.diffName));
    return diffPath.pipe(
      map((value) => {
        const amount = utils.getChangedFiledAmount(fs.readFileSync(value).toString());
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
}
