import { IpcMainEvent } from 'electron';

export interface IpcChannelInterface {
  name: string;
  handle(event: IpcMainEvent, request?: any): void;
}
