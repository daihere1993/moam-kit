import { BrowserWindow, shell, screen, ipcMain, dialog } from 'electron';
import { rendererAppName, rendererAppPort } from './constants';
import { environment } from '../environments/environment';
import { join } from 'path';
import { format } from 'url';

import { Store } from './store';
import { AutoCommit } from './modules/auto-commit';
import { SyncCode } from './modules/sync-code';
import { IPCMessage, IPCResponse, IPCRequest, SSHData } from '@moam-kit/types';

export default class App {
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  static store: Store;
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow: typeof Electron.BrowserWindow

  public static isDevelopmentMode() {
    const isEnvironmentSet: boolean = 'ELECTRON_IS_DEV' in process.env;
    const getFromEnvironment: boolean =
      parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

    return isEnvironmentSet ? getFromEnvironment : !environment.production;
  }

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      App.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    App.mainWindow = null;
  }

  private static onRedirect(event: any, url: string) {
    if (url !== App.mainWindow.webContents.getURL()) {
      // this is a normal external redirect, open it in a new browser window
      event.preventDefault();
      shell.openExternal(url);
    }
  }

  private static onReady() {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    App.initMainWindow();
    App.loadMainWindow();
    App.loadModules();
    App.initChoreEvent();
  }

  private static onActivate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (App.mainWindow === null) {
      App.onReady();
    }
  }

  private static initMainWindow() {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    const width = Math.min(1280, workAreaSize.width || 1280);
    const height = Math.min(720, workAreaSize.height || 720);

    // Create the browser window.
    App.mainWindow = new BrowserWindow({
      width: width,
      height: height,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false,
      },
    });
    App.mainWindow.setMenu(null);
    App.mainWindow.center();

    // if main window is ready to show, close the splash window and show the main window
    App.mainWindow.once('ready-to-show', () => {
      App.mainWindow.show();
    });

    // handle all external redirects in a new browser window
    // App.mainWindow.webContents.on('will-navigate', App.onRedirect);
    // App.mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    //     App.onRedirect(event, url);
    // });

    // Emitted when the window is closed.
    App.mainWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      App.mainWindow = null;
    });
  }

  private static loadMainWindow() {
    // load the index.html of the app.
    if (!App.application.isPackaged) {
      App.mainWindow.webContents.openDevTools();
      App.mainWindow.loadURL(`http://localhost:${rendererAppPort}`);
    } else {
      App.mainWindow.loadURL(
        format({
          pathname: join(__dirname, '..', rendererAppName, 'index.html'),
          protocol: 'file:',
          slashes: true,
        })
      );
    }
  }

  private static loadModules() {
    AutoCommit.startup();
    SyncCode.startup(App.store);
  }

  private static initChoreEvent() {
    const store = App.store;
    ipcMain.on(IPCMessage.GET_APP_DATA_REQ, (event) => {
      const res: IPCResponse = { isSuccessed: true, data: store.data };
      event.reply(IPCMessage.GET_APP_DATA_RES, res);
    });
  
    ipcMain.on(
      IPCMessage.STORE_DATA_REQ,
      (event, { data, seed }: IPCRequest<{ key: string; value: SSHData }>) => {
        const res: IPCResponse = { isSuccessed: true, seed, data: store.data };
        store.set(data.key, data.value);
        event.reply(IPCMessage.STORE_DATA_RES, res);
        event.reply(IPCMessage.GET_APP_DATA_RES, res);
      },
    );
  
    ipcMain.on(
      IPCMessage.SELECT_PATH_REQ,
      (event, { data, seed }: IPCRequest<{ isDirectory: boolean }>) => {
        const targetPath = dialog.showOpenDialogSync(App.mainWindow, {
          properties: [data.isDirectory ? 'openDirectory' : 'openFile'],
        });
        const res: IPCResponse = { isSuccessed: !!targetPath, data: targetPath, seed };
        event.reply(IPCMessage.SELECT_PATH_RES, res);
      },
    );
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for

    App.store = new Store();
    App.BrowserWindow = browserWindow;
    App.application = app;

    App.application.on('window-all-closed', App.onWindowAllClosed); // Quit when all windows are closed.
    App.application.on('ready', App.onReady); // App is ready to load data
    App.application.on('activate', App.onActivate); // App is activated
  }
}
