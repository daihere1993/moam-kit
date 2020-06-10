import * as path from 'path';
import * as shell from 'shelljs';
import SftpClient from 'ssh2-sftp-client';
import { ipcMain, IpcMainEvent } from 'electron';
import { Observable, concat, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BranchInfo, IPCMessage, SSHData, IPCRequest } from '../common/types';
import { Store } from './store';
import config from './config';
import * as utils from './utils';

let RECONNECT_TIME = 0;
const _config = config.Sync;
const userDataPath = utils.getUserDataPath();
const tmpPatchPath = path.join(userDataPath, _config.PATH_NAME);

console.debug(`User data path: ${userDataPath}`);

export class Sync {
  private store: Store;

  private sftpClient: SftpClient;

  private get setting(): SSHData {
    return this.store.data.ssh;
  }

  private branch: BranchInfo;

  constructor({ store }: { store: Store }) {
    this.store = store;
    this.sftpClient = new (SftpClient as any)();
  }

  public startup(): void {
    ipcMain.on(IPCMessage.SYNC_CODE_REQ, this.toSyncCode.bind(this));
  }

  private toSyncCode(event: IpcMainEvent, { data }: IPCRequest<BranchInfo>): void {
    RECONNECT_TIME = 0;
    this.branch = data;
    this.hasServerConnected()
      .pipe(
        switchMap((isConnected) => {
          return isConnected ? of(true) : this.connectToServer();
        }),
      )
      .subscribe(
        (isConnected: boolean) => {
          if (isConnected) {
            event.reply(IPCMessage.CONNECT_TO_SERVER_DONE, { isSuccessed: true });

            concat(
              this.createPatch(event),
              this.uploadPatchToServer(event),
              this.applyPatchToServer(event),
            ).subscribe(
              () => {},
              (err) => {
                console.log(`${err.name} failed: ${err.message}`);
                event.reply(IPCMessage.SYNC_CODE_RES, {
                  isSuccessed: false,
                  error: { name: err.name, message: err.message },
                });
              },
              () => {
                event.reply(IPCMessage.SYNC_CODE_RES, { isSuccessed: true });
              },
            );
          }
        },
        (err) => {
          console.log(`${err.name} failed: ${err.message}`);
          event.reply(IPCMessage.SYNC_CODE_RES, {
            isSuccessed: false,
            error: {
              name: IPCMessage.CONNECT_TO_SERVER_DONE,
              message: `Connect to server failed: ${err.message}`,
            },
          });
        },
      );
  }

  private hasServerConnected(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      this.sftpClient
        .cwd()
        .then(() => subscriber.next(true))
        .catch(() => {
          if (RECONNECT_TIME === 0) {
            RECONNECT_TIME += 1;
            subscriber.next(false);
          } else {
            subscriber.error(`Failed to connect to server.`);
          }
        });
    });
  }

  private connectToServer(): Observable<boolean> {
    return new Observable((subscriber) => {
      this.sftpClient
        .connect({
          host: this.setting.host,
          username: this.setting.username,
          password: this.setting.password,
        })
        .then(() => {
          RECONNECT_TIME = 0;
          return subscriber.next(true);
        })
        .catch((err) => {
          RECONNECT_TIME = 0;
          const error = new Error(`Connect to server failed: ${err.message}`);
          subscriber.error(error);
        });
    });
  }

  private createPatch(event: IpcMainEvent): Observable<void> {
    return new Observable<void>((subscriber) => {
      console.log('createPatch: start.');
      shell.cd(this.branch.pcDir).exec(`svn di > ${tmpPatchPath}`, (code, stdout, stderr) => {
        if (code === 0) {
          console.log('createPatch: done.');
          event.reply(IPCMessage.CREATE_PATCH_DONE, { isSuccessed: true });
          subscriber.complete();
        } else {
          const error = new Error(`Create patch failed: ${stderr}, ${code}.`);
          error.name = IPCMessage.CREATE_PATCH_DONE;
          subscriber.error(error);
        }
      });
    });
  }

  private uploadPatchToServer(event: IpcMainEvent): Observable<void> {
    return new Observable<void>((subscriber) => {
      console.log('uploadPatchToServer: start.');
      this.sftpClient
        .fastPut(path.join(tmpPatchPath), `${this.branch.serverDir}/${_config.PATH_NAME}`)
        .then(() => {
          console.log('uploadPatchToServer: done.');
          event.reply(IPCMessage.UPLOAD_PATCH_TO_SERVER_DONE, { isSuccessed: true });
          return subscriber.complete();
        })
        .catch((err) => {
          const error = new Error(`Upload patch to server failed: ${err.message}`);
          error.name = IPCMessage.UPLOAD_PATCH_TO_SERVER_DONE;
          subscriber.error(error);
        });
    });
  }

  private applyPatchToServer(event: IpcMainEvent): Observable<void> {
    return new Observable<void>((subscriber) => {
      console.log('applyPatchToServer: start.');
      const { client } = this.sftpClient as any;
      client.exec(
        // `cd ${this.branch.serverDir} && svn revert -R . && patch -p0 < ${_config.PATH_NAME}`,
        `cd ${this.branch.serverDir} && svn revert -R . && svn patch ${_config.PATH_NAME}`,
        (err, stream) => {
          if (err) {
            const error = new Error(`Apply patch to server failed: ${err.message}`);
            error.name = IPCMessage.APPLY_PATCH_TO_SERVER_DONE;
            subscriber.error(error);
          }

          stream
            .on('close', () => {
              console.log('applyPatchToServer: done.');
              event.reply(IPCMessage.APPLY_PATCH_TO_SERVER_DONE, { isSuccessed: true });
              subscriber.complete();
            })
            .on('data', (data) => {
              const output = data.toString();
              console.log(`Output: ${output}`);
            })
            .stderr.on('data', (data) => {
              const error = new Error(`Apply patch to server failed: ${data}`);
              error.name = IPCMessage.APPLY_PATCH_TO_SERVER_DONE;
              subscriber.error(error);
            });
        },
      );
    });
  }
}
