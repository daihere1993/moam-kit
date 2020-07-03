import { IpcMainEvent } from 'electron';


export default interface IpcChannelInterface {
  name: string;
  handle(event: IpcMainEvent, request: any): void;
}
