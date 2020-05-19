import * as path from 'path';
import * as shell from 'shelljs';
import * as SftpClient from 'ssh2-sftp-client';
import {
  app,
  remote,
  BrowserWindow,
  ipcMain,
  dialog,
  IpcMainEvent,
} from 'electron';
import { Observable, concat, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  TO_SELECT_FOLDER,
  REPLY_SELECT_FOLDER,
  TO_GET_SETTING,
  REPLY_GET_SETTING,
  TO_STORE_SETTING,
  REPLY_STORE_SETTING,
  TO_SYNC_CODE,
  REPLY_SYNC_CODE,
  CONNECT_TO_SERVER_DONE,
  UPLOAD_PATCH_TO_SERVER_DONE,
  CREATE_PATCH_DONE,
  APPLY_PATCH_TO_SERVER_DONE,
} from '../common/message';
import { SettingInfo } from '../common/types';
import { Store } from './store';

let RECONNECT_TIME = 0;
const TMP_PATCH_NAME = 'moam-kit.patch';
const userDataPath = (app || remote.app).getPath('userData');
const tmpPatchPath = path.join(userDataPath, TMP_PATCH_NAME);

export class Sync {
  private store: Store;

  private win: BrowserWindow;

  private sftpClient: SftpClient;

  private get setting(): SettingInfo {
    return this.store.data as SettingInfo;
  }

  constructor({ win }: { win: BrowserWindow }) {
    this.store = new Store();
    this.win = win;
    this.sftpClient = new (SftpClient as any)();
  }

  public startup(): void {
    this.messageListening();
  }

  private messageListening() {
    ipcMain.on(TO_SELECT_FOLDER, (event) => {
      const dir = dialog.showOpenDialogSync(this.win, {
        properties: ['openDirectory'],
      });
      event.reply(REPLY_SELECT_FOLDER, dir);
    });

    ipcMain.on(TO_GET_SETTING, (event) => {
      event.reply(REPLY_GET_SETTING, this.setting);
    });

    ipcMain.on(TO_STORE_SETTING, (event, setting: SettingInfo) => {
      this.store.setAll(setting);
      event.reply(REPLY_STORE_SETTING, 0);
    });

    ipcMain.on(TO_SYNC_CODE, this.toSyncCode.bind(this));
  }

  private toSyncCode(
    event: IpcMainEvent,
    args?: { pcDir: string; serverDir: string },
  ): void {
    if (args && args.pcDir && args.serverDir) {
      this.store.set('pcDir', args.pcDir);
      this.store.set('serverDir', args.serverDir);
    }

    const setting = this.setting as SettingInfo;
    if (Object.keys(setting).length === 0 && event) {
      event.reply(REPLY_SYNC_CODE, 'Please setup info first.');
      return;
    }

    this.hasServerConnected()
      .pipe(
        switchMap((isConnected) => {
          return isConnected ? of(true) : this.connectToServer();
        }),
      )
      .subscribe(
        (isConnected: boolean) => {
          if (isConnected) {
            event.reply(CONNECT_TO_SERVER_DONE, { isSuccessed: true });

            concat(
              this.createPatch(event),
              this.uploadPatchToServer(event),
              this.applyPatchToServer(event),
            ).subscribe(
              () => {},
              (err) => {
                console.log(`${err.name} failed: ${err.message}`);
                event.reply(REPLY_SYNC_CODE, {
                  isSuccessed: false,
                  error: { name: err.name, message: err.message },
                });
              },
              () => {
                event.reply(REPLY_SYNC_CODE, { isSuccessed: true });
              },
            );
          }
        },
        (err) => {
          console.log(`${err.name} failed: ${err.message}`);
          event.reply(CONNECT_TO_SERVER_DONE, {
            isSuccessed: false,
            error: {
              name: CONNECT_TO_SERVER_DONE,
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
          const error = new Error(`Connect to server failed: ${err.message}`);
          subscriber.error(error);
        });
    });
  }

  private createPatch(event: IpcMainEvent): Observable<void> {
    return new Observable<void>((subscriber) => {
      console.log('createPatch: start.');
      shell
        .cd(this.setting.pcDir)
        .exec(`svn di > ${tmpPatchPath}`, (code, stdout, stderr) => {
          if (code === 0) {
            console.log('createPatch: done.');
            event.reply(CREATE_PATCH_DONE, { isSuccessed: true });
            subscriber.complete();
          } else {
            const error = new Error(`Create patch failed: ${stderr}, ${code}.`);
            error.name = CREATE_PATCH_DONE;
            subscriber.error(error);
          }
        });
    });
  }

  private uploadPatchToServer(event: IpcMainEvent): Observable<void> {
    return new Observable<void>((subscriber) => {
      console.log('uploadPatchToServer: start.');
      this.sftpClient
        .fastPut(
          path.join(tmpPatchPath),
          `${this.setting.serverDir}/${TMP_PATCH_NAME}`,
        )
        .then(() => {
          console.log('uploadPatchToServer: done.');
          event.reply(UPLOAD_PATCH_TO_SERVER_DONE, { isSuccessed: true });
          return subscriber.complete();
        })
        .catch((err) => {
          const error = new Error(
            `Upload patch to server failed: ${err.message}`,
          );
          error.name = UPLOAD_PATCH_TO_SERVER_DONE;
          subscriber.error(error);
        });
    });
  }

  private applyPatchToServer(event: IpcMainEvent): Observable<void> {
    return new Observable<void>((subscriber) => {
      console.log('applyPatchToServer: start.');
      const { client } = this.sftpClient as any;
      client.exec(
        `cd ${this.setting.serverDir} && svn revert -R . && svn patch ${TMP_PATCH_NAME}`,
        (err, stream) => {
          if (err) {
            const error = new Error(
              `Apply patch to server failed: ${err.message}`,
            );
            error.name = APPLY_PATCH_TO_SERVER_DONE;
            subscriber.error(error);
          }

          stream
            .on('close', () => {
              console.log('applyPatchToServer: done.');
              event.reply(APPLY_PATCH_TO_SERVER_DONE, { isSuccessed: true });
              subscriber.complete();
            })
            .on('data', (data) => {
              const output = data.toString();
              console.log(`Output: ${output}`);
            })
            .stderr.on('data', (data) => {
              const error = new Error(`Apply patch to server failed: ${data}`);
              error.name = APPLY_PATCH_TO_SERVER_DONE;
              subscriber.error(error);
            });
        },
      );
    });
  }
}
