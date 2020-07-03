import * as path from 'path';
import * as fs from 'fs';
import { IPCMessage, IPCRequest, AutoCommitInfo, IPCResponse, IPCError } from '@app/common/types';
import { IpcMainEvent } from 'electron';
import { Observable } from 'rxjs';

import config from '../config';
import * as utils from '../utils';
import IpcChannelInterface from '../ipc/ipc-channel.interface';

const _config = config.AutoCommit;
const DATA_PATH = utils.getUserDataPath();
const COMMIT_MSG_PATH = path.join(DATA_PATH, _config.COMMIT_MESSAGE_FILE_NAME);

export default class CommitMsgChannel implements IpcChannelInterface {
  name = IPCMessage.PREPARE_COMMIT_MSG_REQ;

  handle(event: IpcMainEvent, request: IPCRequest<AutoCommitInfo>): void {
    this.prepareCommitMsg(request.data, COMMIT_MSG_PATH).subscribe(
      (res) => {
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
  }

  private prepareCommitMsg(data: AutoCommitInfo, target: string): Observable<IPCResponse> {
    const msg = [
      `REFERENCE : PR ${data.prontoTitle}`,
      `PRODUCT : LTE`,
      `COMPLETED : YES`,
      `DESCRIPTION : ${data.description}`,
      `ACCEPTED_BY : RB ${data.reviewBoardID}`,
    ].join('\n');

    const stream = fs.createWriteStream(target);
    return new Observable<IPCResponse>((subscriber) => {
      stream.on('close', () => {
        const res: IPCResponse = { isSuccessed: true, data: msg };
        subscriber.next(res);
        subscriber.complete();
      });
      stream.write(msg);
      stream.end();
    });
  }
}
