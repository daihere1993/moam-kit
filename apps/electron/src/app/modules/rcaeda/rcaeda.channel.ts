import { IpcChannelInterface } from '@electron/app/interfaces';
import { IPCMessage, IPCRequest } from '@moam-kit/types';
import { IpcMainEvent } from 'electron';
import * as utils from '@electron/app/utils';
import * as XLSX from 'xlsx';

export interface FormattedDate {
  RUMAG2: {
    prId: string;
    isLegacy: boolean;
    feature: string;
    rbLink: string;
    changedFiles: string[];
  }[];
}

export class RCEDAChannel implements IpcChannelInterface {
  name = IPCMessage.RCAEDA_ANALYZE_REQ;

  handle(event: IpcMainEvent, request: IPCRequest<string>): void {
    const tmpName = 'tmp.diff';
    const tmpDir = utils.getTmpDir();
    const path = tmpDir + tmpName;
    const data = this.getFormattedDate(request.data);
    for (const item of data.RUMAG2) {
      utils.downLoadDiff(item.rbLink, path);
    }
  }

  private getFormattedDate(excelPath: string): FormattedDate {
    const data: FormattedDate = { RUMAG2: [] };
    const workbook = XLSX.readFile(excelPath);
    const originalRUMAG2 = workbook.Sheets.RUMAG2;
    const rowAmount = this.getRowAmount(originalRUMAG2);
    console.debug(rowAmount);

    for (let i = 2; i <= rowAmount; i++) {
      data.RUMAG2.push({
        prId: originalRUMAG2[`A${i}`].v,
        isLegacy: originalRUMAG2[`I${i}`] ? originalRUMAG2[`I${i}`].v === 'Legacy Code' : false,
        feature: originalRUMAG2[`J${i}`] ? originalRUMAG2[`J${i}`].v : '',
        rbLink: originalRUMAG2[`W${i}`] ? originalRUMAG2[`W${i}`].v : '',
        changedFiles: [],
      });
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
