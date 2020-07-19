import * as path from 'path';
import * as shell from 'shelljs';
import SftpClient from 'ssh2-sftp-client';
import { IpcChannelInterface } from '@electron/app/interfaces';
import { IPCMessage, IPCRequest, BranchInfo } from '@moam-kit/types';
import { IpcMainEvent } from 'electron';
import { getUserDataPath } from '@electron/app/utils';
import { M_CodeSync } from '@electron/app/constants';
import { Store } from '@electron/app/store';

const userDataPath = getUserDataPath();
const tmpDiffPath = path.join(userDataPath, M_CodeSync.diffName);

export class SyncCodeChannel implements IpcChannelInterface {
  name = IPCMessage.SYNC_CODE_REQ;

  private sftpClient: SftpClient;

  private branch: BranchInfo;

  private store: Store;

  constructor(store: Store) {
    this.store = store;
    this.sftpClient = new SftpClient();
  }

  handle(event: IpcMainEvent, request: IPCRequest<BranchInfo>): void {
    this.branch = request.data;
    this.connectServer(event)
      .then(() => this.createPatch(event))
      .then(() => this.uploadPatchToServer(event))
      .then(() => this.applyPatchToServer(event))
      .then(() => {
        event.reply(IPCMessage.SYNC_CODE_RES, { isSuccessed: true });
      })
      .catch((err) => {
        console.log(`${err.name} failed: ${err.message}`);
        event.reply(IPCMessage.SYNC_CODE_RES, {
          isSuccessed: false,
          error: { name: err.name, message: err.message },
        });
      });
  }

  private async connectServer(event: IpcMainEvent): Promise<any> {
    return this.sftpClient.cwd().catch(() => {
      return this.connectServer_();
    }).then(() => {
      event.reply(IPCMessage.CONNECT_TO_SERVER_DONE, { isSuccessed: true });
    });
  }

  private async connectServer_(): Promise<any> {
    const sshInfo = this.store.data.ssh;
    return this.sftpClient
      .connect({
        host: sshInfo.host,
        username: sshInfo.username,
        password: sshInfo.password,
      })
      .catch((err) => {
        err.name = IPCMessage.CONNECT_TO_SERVER_DONE;
        throw err;
      });
  }

  private async createPatch(event: IpcMainEvent): Promise<any> {
    console.debug('createPatch: start.');
    return shell.cd(this.branch.pcDir).exec(`svn di > ${tmpDiffPath}`, (code, stdout, stderr) => {
      if (code === 0) {
        console.debug('createPatch: done.');
        event.reply(IPCMessage.CREATE_PATCH_DONE, { isSuccessed: true });
      } else {
        const err = new Error(`Create patch failed: ${stderr}, ${code}.`);
        err.name = IPCMessage.CREATE_PATCH_DONE;
        throw err;
      }
    });
  }

  private async uploadPatchToServer(event: IpcMainEvent): Promise<any> {
    console.debug('uploadPatchToServer: start.');
    return this.sftpClient
      .fastPut(path.join(tmpDiffPath), `${this.branch.serverDir}/${M_CodeSync.diffName}`)
      .then(() => {
        console.debug('uploadPatchToServer: done.');
        event.reply(IPCMessage.UPLOAD_PATCH_TO_SERVER_DONE, { isSuccessed: true });
      })
      .catch((err) => {
        const error = new Error(`Upload patch to server failed: ${err.message}`);
        error.name = IPCMessage.UPLOAD_PATCH_TO_SERVER_DONE;
        throw error;
      });
  }

  private async applyPatchToServer(event: IpcMainEvent): Promise<any> {
    console.debug('applyPatchToServer: start.');
    const { client } = this.sftpClient as any;
    return new Promise((resolve) => {
      client.exec(
        // `cd ${this.branch.serverDir} && svn revert -R . && patch -p0 < ${M_CodeSync.diffName}`,
        `cd ${this.branch.serverDir} && svn revert -R . && svn patch ${M_CodeSync.diffName}`,
        (err: any, stream: any) => {
          if (err) {
            const error = new Error(`Apply patch to server failed: ${err.message}`);
            error.name = IPCMessage.APPLY_PATCH_TO_SERVER_DONE;
            throw error;
          }

          stream
            .on('close', () => {
              console.debug('applyPatchToServer: done.');
              event.reply(IPCMessage.APPLY_PATCH_TO_SERVER_DONE, { isSuccessed: true });
              resolve();
            })
            .on('data', (data: any) => {
              const output = data.toString();
              console.debug(`Output: ${output}`);
            })
            .stderr.on('data', (data: any) => {
              const error = new Error(`Apply patch to server failed: ${data}`);
              error.name = IPCMessage.APPLY_PATCH_TO_SERVER_DONE;
              throw error;
            });
        },
      );
    });
  }
}
