import { Injectable, NgZone } from '@angular/core';
import { IPCMessage, IPCRequest, IPCResponse } from 'src/common/types';
import { ipcRenderer } from 'electron';
import { ElectronService } from './electron.service';

@Injectable()
export class IpcService {
  messages: {
    name: IPCMessage;
    listener: (event: any, res: IPCResponse) => void;
  }[] = [];

  // IPC event seed to identify the right response
  seed: number;

  ipcRenderer: typeof ipcRenderer;

  constructor(private electronService: ElectronService, private zone: NgZone) {
    if (this.electronService.isElectron) {
      this.ipcRenderer = this.electronService.ipcRenderer;
      this.seed = this.electronService.seedrandom.int32();
    }
  }

  public send<T>(message: IPCMessage, req?: IPCRequest<T>): void {
    if (this.electronService.isElectron) {
      if (req) {
        req.seed = this.seed;
      }
    }
    this.ipcRenderer.send(message, req || { seed: this.seed });
  }

  public on(message: IPCMessage, cb: (event: any, res: IPCResponse) => void): void {
    if (this.electronService.isElectron) {
      const listener = (event: any, res: IPCResponse) => {
        if (!res.seed || res.seed === this.seed) {
          this.zone.run(() => {
            cb(event, res);
          });
        }
      }
      this.messages.push({ name: message, listener });
      this.ipcRenderer.on(message, listener);
    }
  }

  public destroy() {
    this.messages.forEach(({ name, listener }) => {
      this.ipcRenderer.removeListener(name, listener);
    });
  }
}
