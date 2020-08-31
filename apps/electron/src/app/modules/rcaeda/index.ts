import { ipcMain } from 'electron';
import { RCEDAChannel } from './rcaeda.channel';

export class RCAEDA {
  public static startup(): void {
    const channel = new RCEDAChannel();
    ipcMain.on(channel.name, channel.handle.bind(channel));
  }
}
