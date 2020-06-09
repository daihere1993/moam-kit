import * as path from 'path';
import { app, remote } from "electron";
import { config } from 'node-config-ts';

export function getUserDataPath(): string {
  if (app || remote) {
    return (app || remote.app).getPath('userData');
  }
  return path.join(process.cwd(), 'src/main-process/test/tmp');
}

export function getReviewBoardDiffURL(id: number): string {
  return `${config.AutoCommit.REVIEW_BOARD_BASED_URL}/r/${id}/diff/raw`;
}
