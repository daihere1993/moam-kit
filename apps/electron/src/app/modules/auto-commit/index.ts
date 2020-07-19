import { ipcMain } from 'electron';

import DiffChannel from './diff.channel';
import CommitMsgChannel from './commit-msg.channel';
import AutoCommitChannel from './auto-commit.channel';

const channels = [DiffChannel, CommitMsgChannel, AutoCommitChannel];

export class AutoCommit {
  static startup() {
    for (const Channel of channels) {
      const channel = new Channel();
      ipcMain.on(channel.name, channel.handle);
    }
  }
}
