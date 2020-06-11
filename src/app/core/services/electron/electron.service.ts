import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, App } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import seedrandom from 'seedrandom';

import { IPCMessage, APPData, IPCResponse } from 'src/common/types';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { isMatch, merge } from 'lodash';

// Don't change the data reference
const memorize = (() => {
  let prevValue: APPData;
  return (value: APPData): APPData => {
    prevValue = prevValue || value;
    if (!isMatch(value, prevValue)) {
      merge(prevValue, value);
    }
    return prevValue;
  };
})();

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;

  webFrame: typeof webFrame;

  remote: typeof remote;

  childProcess: typeof childProcess;

  fs: typeof fs;

  appData$: Observable<APPData>;

  seedrandom: { int32: () => number };

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.seedrandom = seedrandom('IPCEventSeed');
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      const subject = new BehaviorSubject<APPData>(undefined);
      this.appData$ = subject.pipe(filter((data) => !!data));
      this.ipcRenderer.send(IPCMessage.GET_APP_DATA_REQ);
      this.ipcRenderer.on(IPCMessage.GET_APP_DATA_RES, (event, res: IPCResponse) => {
        if (res.isSuccessed) {
          subject.next(memorize(res.data));
        }
      });
    }
  }
}
