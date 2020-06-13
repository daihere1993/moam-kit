import { Injectable } from '@angular/core';
import { isMatch, merge } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IPCMessage, APPData, IPCResponse } from 'src/common/types';
import { ElectronService } from './electron.service';
import { HttpClient } from '@angular/common/http';

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
export class StoreService {
  private data: Observable<APPData>;

  constructor(private electronService: ElectronService, private httpService: HttpClient) {
    if (this.electronService.isElectron) {
      const subject = new BehaviorSubject<APPData>(undefined);
      this.data = subject.pipe(filter((data) => !!data));
      this.electronService.ipcRenderer.send(IPCMessage.GET_APP_DATA_REQ);
      this.electronService.ipcRenderer.on(
        IPCMessage.GET_APP_DATA_RES,
        (event, res: IPCResponse) => {
          if (res.isSuccessed) {
            subject.next(memorize(res.data));
          }
        },
      );
    }
  }

  public getData(): Observable<APPData> {
    if (this.electronService.isElectron) {
      return this.data;
    }
    return this.httpService.get('/get/mocked/data')
      .pipe(map((data: APPData) => data));
  }
}
