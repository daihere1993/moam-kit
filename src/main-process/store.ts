/* eslint-disable import/no-extraneous-dependencies */
import * as path from 'path';
import * as fs from 'fs';
import config from './config';
import { APPData } from '../common/types';
import * as utils from './utils';

const _config = config.Common;

export class Store {
  public data: APPData;

  public path: string;

  constructor() {
    this.path = path.join(utils.getUserDataPath(), _config.STORAGE_NAME);
    this.data = fs.existsSync(this.path) ? parseDataFile(this.path) : {} as APPData;
  }

  public get(key: string): any {
    return this.data[key];
  }

  public set(key: string, val: any): void {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  public setAll(data: APPData): void {
    this.data = data;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath: string): APPData {
  return JSON.parse(fs.readFileSync(filePath).toString());
}
