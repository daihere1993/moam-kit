/* eslint-disable import/no-extraneous-dependencies */
import * as path from 'path';
import * as fs from 'fs';
import * as electron from 'electron';
import { SettingInfo } from 'src/types';

export class Store {
  public data: SettingInfo | {};

  public path: string;

  constructor() {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData',
    );
    this.path = path.join(userDataPath, 'setting.json');
    this.data = fs.existsSync(this.path) ? parseDataFile(this.path) : {};
  }

  public get(key: string): any {
    return this.data[key];
  }

  public set(key: string, val: any): void {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  public setAll(data: SettingInfo): void {
    this.data = data;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath: string): SettingInfo {
  return JSON.parse(fs.readFileSync(filePath).toString());
}
