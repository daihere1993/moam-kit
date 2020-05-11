import * as path from 'path';
import * as shell from 'shelljs';
import * as SftpClient from 'ssh2-sftp-client';
import * as electron from 'electron';

import { BehaviorSubject, Subject } from 'rxjs';

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

export function getPatchFromPC$(pcDir: string): Subject<boolean> {
  const ret$ = new Subject<boolean>();
  shell.cd(pcDir).exec(`svn di > ${tmpPatchPath}`, (code, stdout, stderr) => {
    console.log('Program output:', stdout);
    if (code === 0) {
      ret$.complete();
    } else {
      throw new Error(`Get patch from PC failed: ${stderr}, ${code}.`);
    }
  });

  return ret$;
}

export function applyPatchToServer$(serverDir: string): Subject<boolean> {
  const ret$ = new Subject<boolean>();
  const { client } = sftpClient as any;
  client.shell((err: any, stream: any) => {
    if (err) {
      throw new Error(`Apply patch to server failed: ${err.message}`);
    }

    stream
      .on('close', () => {
        // console.log('Stream :: close');
        // client.end();
      })
      .on('data', (data) => {
        console.log(`Output: ${data}`);
        ret$.complete();
      });
    stream.end(
      `cd ${serverDir}\nsvn revert -R .\nsvn patch ${TMP_PATCH_NAME}\n`,
    );
  });

  return ret$;
}
