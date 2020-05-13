import * as path from 'path';
import * as shell from 'shelljs';
import * as SftpClient from 'ssh2-sftp-client';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as electron from 'electron';

import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { SSHInfo } from 'src/types';

const TMP_PATCH_NAME = 'moam-kit.patch';
const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const tmpPatchPath = path.join(userDataPath, TMP_PATCH_NAME);

const sftpClient = new (SftpClient as any)();

export function connectToServer$(sshConfig: SSHInfo): BehaviorSubject<boolean> {
  const ret$ = new BehaviorSubject(false);
  sftpClient
    .connect(sshConfig)
    .then(() => ret$.next(true))
    .catch((err) => {
      throw new Error(`Connect to server failed: ${err.message}`);
    });

  return ret$;
}

export function getPatchFromPC$(pcDir: string): Observable<void> {
  const ret$ = new Observable<void>((subscriber) => {
    console.log('getPatchFromPC: start.');
    shell.cd(pcDir).exec(`svn di > ${tmpPatchPath}`, (code, stdout, stderr) => {
      if (code === 0) {
        console.log(`pcDir: ${pcDir}, tmpPatchPath: ${tmpPatchPath}`);
        console.log('getPatchFromPC: done.');
        subscriber.complete();
      } else {
        throw new Error(`Get patch from PC failed: ${stderr}, ${code}.`);
      }
    });
  });

  return ret$;
}

export function updatePatchToServer$(serverDir: string): Observable<void> {
  const ret$ = new Observable<void>((subscriber) => {
    console.log('updatePatchToServer: start.');
    sftpClient
      .fastPut(path.join(tmpPatchPath), `${serverDir}/${TMP_PATCH_NAME}`)
      .then(() => {
        console.log('updatePatchToServer: done.');
        return subscriber.complete();
      })
      .catch((err) => {
        throw new Error(`Update patch to server failed: ${err.message}`);
      });
  });

  return ret$;
}

export function applyPatchToServer$(serverDir: string): Observable<void> {
  const ret$ = new Observable<void>((subscriber) => {
    console.log('applyPatchToServer: start.');
    const { client } = sftpClient as any;
    client.exec(
      `cd ${serverDir} && svn revert -R . && svn patch ${TMP_PATCH_NAME}`,
      (err, stream) => {
        if (err) {
          throw new Error(`Apply patch to server failed: ${err.message}`);
        }

        stream
          .on('close', () => {
            console.log('applyPatchToServer: done.');
            subscriber.complete();
          })
          .on('data', (data) => {
            const output = data.toString();
            console.log(`Output: ${output}`);
          })
          .stderr.on('data', (data) => {
            throw new Error(`Apply patch to server failed: ${data}`);
          });
      },
    );
  });

  return ret$;
}
