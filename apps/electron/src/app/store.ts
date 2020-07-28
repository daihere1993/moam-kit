import * as path from 'path';
import * as fs from 'fs';
import { getUserDataPath } from './utils';
import { APPData } from '@moam-kit/types';
import { storeName } from './constants';

function parseDataFile(filePath: string): APPData {
  return JSON.parse(fs.readFileSync(filePath).toString());
}

const emptyData: APPData = {
  ssh: {
    host: null,
    username: null,
    password: null,
  },
  branches: []
}

export class Store {
  public data: APPData;

  public path: string;

  constructor() {
    this.path = path.join(getUserDataPath(), storeName);
    console.debug(this.path);
    this.data = fs.existsSync(this.path) ? parseDataFile(this.path) : emptyData;
  }

  public get(key: string): any {
    return this.data[key];
  }

  public set(key: string, val: any): void {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  public addItem(key: string, val: any): void {
    if (!Array.isArray(this.data[key])) {
      throw new Error('[STORE]: Original data should be an Array.');
    }
    this.data[key].push(val);
  }

  public editItem(key: string, name: string, val: any): void {
    if (!Array.isArray(this.data[key])) {
      throw new Error('[STORE]: Original data should be an Array.');
    }
    
    const target = this.data[key].find((item: { name: string }) => item.name === name);
    Object.assign(target, val);
  }

  public deleteItem(key: string, name: string): void {
    if (!Array.isArray(this.data[key])) {
      throw new Error('[STORE]: Original data should be an Array.');
    }

    const index = this.data[key].findIndex((item: { name: string }) => item.name === name);
    this.data[key].splice(index);
  }

  public setAll(data: APPData): void {
    this.data = data;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}
