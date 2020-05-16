import * as path from 'path';
import * as url from 'url';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  Menu,
  MenuItem,
  IpcMainEvent,
} from 'electron';
import { BehaviorSubject, concat } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  connectToServer$,
  getPatchFromPC$,
  updatePatchToServer$,
  applyPatchToServer$,
} from './operator';
import { SSHInfo, SettingInfo } from '../types';
import { Store } from './store';

let win: BrowserWindow;
const args = process.argv.slice(1);
const serve = args.some((val) => val === '--serve');
const store = new Store();
let isConnected: BehaviorSubject<boolean>;

function toSyncCode(event: IpcMainEvent, { pcDir, serverDir }): void {
  const replayKeyword = 'syncCode-reply';

  if (pcDir && serverDir) {
    store.set('pcDir', pcDir);
    store.set('serverDir', serverDir);
  }

  const settingInfo = store.data as SettingInfo;

  if (Object.keys(settingInfo).length === 0 && event) {
    event.reply(replayKeyword, 'Please setup info first.');
    return;
  }

  const sshInfo: SSHInfo = {
    host: settingInfo.host,
    username: settingInfo.username,
    password: settingInfo.password,
  };

  isConnected = isConnected || connectToServer$(sshInfo);
  isConnected.subscribe(
    (v) => {
      if (v) {
        concat(
          getPatchFromPC$(settingInfo.pcDir),
          updatePatchToServer$(settingInfo.serverDir),
          applyPatchToServer$(settingInfo.serverDir),
        ).subscribe(
          () => {},
          (err) => {
            event.reply(replayKeyword, err.message);
          },
          () => {
            event.reply(replayKeyword, 0);
          },
        );
      }
    },
    (err) => {
      event.reply(replayKeyword, err.message);
    },
  );
}

function createWindow(): BrowserWindow {
  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
    },
  });

  if (serve) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('devtron').install();
    win.webContents.openDevTools();

    // eslint-disable-next-line import/no-extraneous-dependencies
    require('electron-reload')(process.cwd(), {
      electron: require(`${process.cwd()}/node_modules/electron`),
    });
    win.loadURL('http://localhost:1337');
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, '../render-process/index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = undefined;
  });

  return win;
}

try {
  app.allowRendererProcessReuse = true;

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () =>
    setTimeout(() => {
      createWindow();

      // Add shortcuts
      const menu = new Menu();
      menu.append(
        new MenuItem({
          label: 'Edit',
          submenu: [
            {
              label: 'To Sync Code',
              accelerator: 'Ctrl+Enter',
              click: (menuItem, browserWindow) => {
                browserWindow.webContents.send('to-syncCode-from-main');
              },
            },
          ],
        }),
      );
      Menu.setApplicationMenu(menu);
    }, 400),
  );

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  ipcMain.on('to-selectFolder', (event) => {
    const dir = dialog.showOpenDialogSync(win, {
      properties: ['openDirectory'],
    });
    event.reply('selectFolder-reply', dir);
  });

  ipcMain.on('to-getSetting', (event) => {
    event.reply('getSetting-reply', store.data);
  });

  ipcMain.on('to-storeSetting', (event, settingInfo: SettingInfo) => {
    store.setAll(settingInfo);
    event.reply('storeSetting-reply', 0);
  });

  ipcMain.on('to-syncCode', toSyncCode);

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!win) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
