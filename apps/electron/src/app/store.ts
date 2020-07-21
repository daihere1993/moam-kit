import * as path from 'path';
import * as fs from 'fs';
import { getUserDataPath } from './utils';
import { APPData } from '@moam-kit/types';
import { storeName } from './constants';

function parseDataFile(filePath: string): APPData {
  return JSON.parse(fs.readFileSync(filePath).toString());
}

export class Store {
  public data: APPData;

  public path: string;

  constructor() {
    this.path = path.join(getUserDataPath(), storeName);
    console.debug(this.path);
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
