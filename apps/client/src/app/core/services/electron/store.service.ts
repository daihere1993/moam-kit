import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isMatch, merge, isEmpty } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IPCMessage, APPData, IPCResponse, BranchInfo } from '@moam-kit/types';
import { ElectronService } from './electron.service';

// Don't change the data reference
const memorize = (() => {
  const prevValue = {} as any;
  return (value: APPData): APPData => {
    merge(prevValue, value);
    return prevValue;
  };
})();

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private data: Observable<APPData>;

  constructor(
    private electronService: ElectronService,
    private httpService: HttpClient,
    private zone: NgZone,
  ) {
    if (this.electronService.isElectron) {
      const subject = new BehaviorSubject<APPData>(undefined);
      this.data = subject.pipe(filter((data) => !!data));
      this.electronService.ipcRenderer.send(IPCMessage.GET_APP_DATA_REQ);
      this.electronService.ipcRenderer.on(
        IPCMessage.GET_APP_DATA_RES,
        (event, res: IPCResponse) => {
          if (res.isSuccessed) {
            // subject.next(memorize(res.data));
            this.zone.run(() => {
              subject.next(res.data);
            });
          }
        },
      );
    }
  }

  public getData(): Observable<APPData> {
    if (this.electronService.isElectron) {
      return this.data;
    }
    return this.httpService.get('/get/mocked/data').pipe(map((data: APPData) => data));
  }

  public getBranches(): Observable<BranchInfo[]> {
    if (this.electronService.isElectron) {
      return this.data.pipe(
        map((data) => {
          return data.branches;
        }),
      );
    }
    return this.httpService.get('/get/mocked/data').pipe(map((data: APPData) => data.branches));
  }
}
