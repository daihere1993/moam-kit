import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { app, remote } from 'electron';
import { M_AutoCommit } from '@electron/app/constants';
import { Observable } from 'rxjs';

export function getTestDir(): string {
  return path.join(__dirname, '../../__test__');
}

export function getUserDataPath(): string {
  if (app || remote) {
    return (app || remote.app).getPath('userData');
  }
  return path.join(getTestDir(), 'tmp');
}

export function getTmpDir(): string {
  return path.join(getUserDataPath(), 'tmp')
}

export function getReviewBoardDiffURL(id: number): string {
  return `${M_AutoCommit.reviewBoardBasedUrl}/r/${id}/diff/raw`;
}

export function isObject(obj: any): boolean {
  return typeof obj === 'object' && obj !== null;
}

export function isEmptyObj(obj: { [key: string]: any }): boolean {
  if (!isObject(obj)) {
    throw new Error('Argument must be a Object.');
  }

  if (!obj) {
    return true;
  }

  for (const [, value] of Object.entries(obj)) {
    if (value) {
      return false;
    }
  }
  return true;
}

export function getChangedFiledAmount(diffContent: string): number {
  return diffContent.split('(working copy)').length - 1;
}

export function downLoadDiff(url: string, target: string): Observable<string> {
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
