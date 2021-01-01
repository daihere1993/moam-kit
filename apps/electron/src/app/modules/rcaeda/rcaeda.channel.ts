import * as path from 'path';
import * as fs from 'fs';
import * as XLSX from 'xlsx';
import * as utils from '@electron/app/utils';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { IpcChannelInterface } from '@electron/app/interfaces';
import { IPCMessage, IPCRequest, IPCResponse } from '@moam-kit/types';
import { IpcMainEvent } from 'electron';
import { Observable, forkJoin, concat, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface PRInfo {
  prId: string;
  isLegacy: boolean;
  feature: string;
  rbLink: string;
  changedFiles: string[];
}

export interface FormattedDate {
  RUMAG2: PRInfo[];
}

export class RCEDAChannel implements IpcChannelInterface {
  name = IPCMessage.RCAEDA_ANALYZE_REQ;

  private allChangedFiles = [];
  private changedFilesAmountMap = {};

  handle(event: IpcMainEvent, request: IPCRequest<string>): void {
    const tmpDir = path.join(utils.getTmpDir());
    if (fs.existsSync(tmpDir)) {
      fs.readdir(tmpDir, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(tmpDir, file), (err) => {
            if (err) throw err;
          });
        }
      });
    }

    const data = this.getFormattedDate(request.data);
    concat(     
      this.downloadAllDiff(data),
      this.analyzeEachDiff(data),
      this.analyzeChangedFiles(),
    ).subscribe(
      () => {},
      () => {},
      () => {
        const analysisPath = path.join(utils.getUserDataPath(), 'RCAEDA_analysis.xlsx');
        if (fs.existsSync(analysisPath)) {
          fs.unlinkSync(analysisPath);
        }
        const sheet = utils.createASheet(this.changedFilesAmountMap);

        console.debug(Object.keys(this.changedFilesAmountMap).length);

        XLSX.writeFile(
          {
            SheetNames: ['RUMAG2'],
            Sheets: {
              RUMAG2: sheet,
            },
          },
          analysisPath,
        );
        const res: IPCResponse = { isSuccessed: true, data: analysisPath };
        event.reply(IPCMessage.RCAEDA_ANALYZE_RES, res);
      },
    );
  }

  private analyzeChangedFiles(): Observable<void> {
    return new Observable<void>((subscriber) => {
      for (const item of this.allChangedFiles) {
        const { isLegacy, file } = item;
        Object.prototype.hasOwnProperty.call(this.changedFilesAmountMap, file)
          ? this.changedFilesAmountMap[file].total++
          : (this.changedFilesAmountMap[file] = { total: 1, legacy: 0 });
        if (isLegacy) {
          this.changedFilesAmountMap[file].legacy++;
        }
      }
      subscriber.complete();
    });
  }

  private analyzeEachDiff(data: FormattedDate): Observable<any> {
    const changeFiles: Observable<string[]>[] = [];
    for (const item of data.RUMAG2) {
      if (item.rbLink && item.rbLink.includes('http://biedronka.emea.nsn-net.net/')) {
        changeFiles.push(this.getChangedFiles(item));
      }
    }
    return forkJoin(changeFiles).pipe(
      tap((data) => {
        for (const item of data) {
          this.allChangedFiles = this.allChangedFiles.concat(item);
        }
      }),
    );
  }

  private getChangedFiles(prInfo: PRInfo): Observable<any[]> {
    const localDiffPath = this.getLocalDiffPath(prInfo);
    return new Observable<any[]>((subscriber) => {
      if (fs.existsSync(localDiffPath)) {
        fs.readFile(localDiffPath, (err, data) => {
          if (err) {
            console.error(err.message);
            subscriber.error(err.message);
            return;
          }
          prInfo.changedFiles = utils.getChangedFiles(data.toString(), (s) =>
            s.includes('DM_RUMAG/src/static'),
          );
          const target = prInfo.changedFiles.map((s) => {
            return { isLegacy: prInfo.isLegacy, file: s };
          });
          subscriber.next(target);
          subscriber.complete();
        });
      } else {
        console.debug(`no such file: ${localDiffPath}`);
        subscriber.next([]);
        subscriber.complete();
      }
    });
  }

  private downloadAllDiff(data: FormattedDate): Observable<any> {
    const obsers: Observable<any>[] = [];
    for (const item of data.RUMAG2) {
      if (item.rbLink && item.rbLink.includes('http://biedronka.emea.nsn-net.net/')) {
        const localDiffPath = this.getLocalDiffPath(item);
        obsers.push(
          utils.downLoadDiff(utils.getReviewBoardDiffURLByRBPageLink(item.rbLink), localDiffPath),
          timer(2000),
        );
      }
    }
    return forkJoin(obsers);
  }

  private getLocalDiffPath(prInfo: PRInfo) {
    const tmpDir = utils.getTmpDir();
    const filename = `${prInfo.prId.split('/')[0].trim()}.diff`;
    return path.join(tmpDir, filename);
  }

  private getFormattedDate(excelPath: string): FormattedDate {
    const data: FormattedDate = { RUMAG2: [] };
    const workbook = XLSX.readFile(excelPath);
    const originalRUMAG2 = workbook.Sheets.RUMAG2;
    const rowAmount = this.getRowAmount(originalRUMAG2);
    console.debug(rowAmount);
    const moment = extendMoment(Moment);
    const startDate = moment('2020-6-1');
    const endDate = moment('2020-9-30');

    for (let i = 2; i <= rowAmount; i++) {
      const reportDate = originalRUMAG2[`E${i}`] && moment(originalRUMAG2[`E${i}`].w);
      console.debug(originalRUMAG2[`A${i}`].w + ' on going.');
      if (reportDate) {
        console.debug(originalRUMAG2[`A${i}`].w + ': ' + originalRUMAG2[`E${i}`].w);
        if (moment.range(startDate, endDate).contains(reportDate)) {
          data.RUMAG2.push({
            prId: originalRUMAG2[`A${i}`].v,
            isLegacy: originalRUMAG2[`I${i}`] ? originalRUMAG2[`I${i}`].v === 'Legacy Code' : false,
            feature: originalRUMAG2[`J${i}`] ? originalRUMAG2[`J${i}`].v : '',
            rbLink: originalRUMAG2[`W${i}`] ? originalRUMAG2[`W${i}`].v : '',
            changedFiles: [],
          });
      }
      
      }
    }

    return data;
  }

  private getRowAmount(data: any): number {
    let i = 1;
    let target = data['A1'];
    while (target) {
      i++;
      target = data[`A${i}`];
    }

    return i - 1;
  }
}
