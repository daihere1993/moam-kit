import { ipcMain } from 'electron';
import { Store } from '@electron/app/store';
import { SyncCodeChannel } from './sync-code.channel';

export class SyncCode {
  public static startup(store: Store): void {
    const channel = new SyncCodeChannel(store);
    ipcMain.on(channel.name, channel.handle);
  }
}
