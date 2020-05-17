import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow, Menu, MenuItem } from 'electron';
import { TO_SYNC_CODE_FROM_MAIN } from '../common/message';
import { Sync } from './sync';

let win: BrowserWindow;
const args = process.argv.slice(1);
const serve = args.some((val) => val === '--serve');

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
    require('devtron').install();
    win.webContents.openDevTools();

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
  app.on('ready', () => {
    const sync = new Sync({ win });
    sync.startup();

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
                browserWindow.webContents.send(TO_SYNC_CODE_FROM_MAIN);
              },
            },
          ],
        }),
      );
      Menu.setApplicationMenu(menu);
    }, 400);
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

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
