import * as path from 'path';
import * as shell from 'shelljs';
import * as fs from 'fs';
import * as SftpClient from 'ssh2-sftp-client';
import { promisify } from 'util';
import { IpcChannelInterface } from '@electron/app/interfaces';
import { IPCMessage, IPCRequest, BranchInfo } from '@moam-kit/types';
import { IpcMainEvent } from 'electron';
import { getUserDataPath } from '@electron/app/utils';
import { M_CodeSync } from '@electron/app/constants';
import { Store } from '@electron/app/store';
import { SyncCodeStep } from '@moam-kit/steps';

const userDataPath = getUserDataPath();
const tmpDiffPath = path.join(userDataPath, M_CodeSync.diffName);

export class SyncCodeChannel implements IpcChannelInterface {
  name = IPCMessage.SYNC_CODE_REQ;

  private sftpClient: SftpClient;

  private branch: BranchInfo;

  private store: Store;

  private addedFiles: string[];

  constructor(store: Store) {
    this.store = store;
    this.sftpClient = new SftpClient();
  }

  handle(event: IpcMainEvent, request: IPCRequest<BranchInfo>): void {
    this.branch = request.data;
    this.connectServer(event)
      .then(() => this.createDiff(event))
      .then(() => this.diffAnalysis())
      .then(() => this.uploadPatchToServer(event))
      .then(() => this.applyPatchToServer(event))
      .catch((err) => {
        console.log(`${err.name} failed: ${err.message}`);
        event.reply(IPCMessage.SYNC_CODE_RES, {
          isSuccessed: false,
          error: { name: err.name, message: err.message },
        });
      });
  }

  private async connectServer(event: IpcMainEvent): Promise<any> {
    console.debug('connectServer: start.');
    return this.sftpClient
      .cwd()
      .catch(() => {
        return this.connectServer_();
      })
      .then(() => {
        console.debug('connectServer: done.');
        event.reply(IPCMessage.SYNC_CODE_RES, { isSuccessed: true, data: SyncCodeStep.CONNECT_TO_SERVER });
      });
  }

  private async connectServer_(): Promise<any> {
    const sshInfo = this.store.data.ssh;
    return this.sftpClient
      .connect({
        host: sshInfo.host,
        username: sshInfo.username,
        password: sshInfo.password
      })
      .catch((err) => {
        err.name = SyncCodeStep.CONNECT_TO_SERVER;
        throw err;
      });
  }

  private async createDiff(event: IpcMainEvent): Promise<any> {
    console.debug('createDiff: start.');
    return new Promise(resolve => {
      shell.cd(this.branch.pcDir).exec(`svn di > ${tmpDiffPath}`, (code, stdout, stderr) => {
        if (code === 0) {
          console.debug('createDiff: done.');
          event.reply(IPCMessage.SYNC_CODE_RES, { isSuccessed: true, data: SyncCodeStep.CREATE_DIFF });
          resolve();
        } else {
          const err = new Error(`Create patch failed: ${stderr}, ${code}.`);
          err.name = SyncCodeStep.CREATE_DIFF;
          throw err;
        }
      });
    })
  }

  private async diffAnalysis(): Promise<any> {
    console.debug('diffAnalysis: start.');
    const diff = (await promisify(fs.readFile)(tmpDiffPath)).toString();
    const originalFiles = this.getOriginalFilesInfo(diff);
    this.addedFiles = this.getAddedFiles(originalFiles);
    console.debug('diffAnalysis: done.');
  }
  
  private getAddedFiles(origins: string[]): string[] {
    const addedFiles = [];
    for (const origin of origins) {
      if (origin.includes('(nonexistent)')) {
        addedFiles.push(origin.split('\t')[0]);
      }
    }
    return addedFiles;
  }

  private getOriginalFilesInfo(diff: string): string[] {
    const origins = [];
    const sections = diff.split('--- ');
    for (let i = 1; i < sections.length; i++) {
      const sec = sections[i];
      origins.push(sec.split('\r')[0]);
    }
    return origins;
  }

  private async uploadPatchToServer(event: IpcMainEvent): Promise<any> {
    console.debug('uploadPatchToServer: start.');
    return this.sftpClient
      .fastPut(path.join(tmpDiffPath), `${this.branch.serverDir}/${M_CodeSync.diffName}`)
      .then(() => {
        console.debug('uploadPatchToServer: done.');
        event.reply(IPCMessage.SYNC_CODE_RES, { isSuccessed: true, data: SyncCodeStep.UPLOAD_DIFF });
      })
      .catch((err) => {
        const error = new Error(`Upload patch to server failed: ${err.message}`);
        error.name = SyncCodeStep.UPLOAD_DIFF;
        throw error;
      });
  }

  private async applyPatchToServer(event: IpcMainEvent): Promise<any> {
    console.debug('applyPatchToServer: start.');
    const { client } = this.sftpClient as any;
    return new Promise((resolve) => {
      let command = `cd ${this.branch.serverDir} && svn revert -R .`;

      if (this.addedFiles.length > 0) {
        command += ' && rm -rf ';
        for (const file of this.addedFiles) {
          command += `${file} `;
        }
      }
      command += `&& svn patch ${M_CodeSync.diffName}`

      client.exec(
        command,
        (err: any, stream: any) => {
          if (err) {
            const error = new Error(`Apply patch to server failed: ${err.message}`);
            error.name = SyncCodeStep.APPLY_DIFF;
            throw error;
          }

          stream
            .on('close', () => {
              console.debug('applyPatchToServer: done.');
              event.reply(IPCMessage.SYNC_CODE_RES, { isSuccessed: true, data: SyncCodeStep.APPLY_DIFF });
              resolve();
            })
            .on('data', (data: any) => {
              const output = data.toString();
              // console.debug(`Output: ${output}`);
            })
            .stderr.on('data', (data: any) => {
              const error = new Error(`Apply patch to server failed: ${data}`);
              error.name = SyncCodeStep.APPLY_DIFF;
              throw error;
            });
        },
      );
    });
  }
}
