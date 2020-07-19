import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import seedrandom from 'seedrandom';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  shell: typeof shell;

  ipcRenderer: typeof ipcRenderer;

  webFrame: typeof webFrame;

  remote: typeof remote;

  childProcess: typeof childProcess;

  fs: typeof fs;


  seedrandom: { int32: () => number };

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.seedrandom = seedrandom('IPCEventSeed');
      this.shell = window.require('electron').shell;
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }
}