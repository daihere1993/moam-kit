import { Component, OnInit } from '@angular/core';
import { IpcService } from '../core/services/electron/ipc.service';
import { IPCMessage } from '@moam-kit/types';

@Component({
  selector: 'moam-kit-rcaeda',
  templateUrl: './rcaeda.component.html',
  styleUrls: ['./rcaeda.component.css'],
  providers: [IpcService],
})
export class RcaedaComponent implements OnInit {
  excelPath: string;
  analysisPath: string;

  isSyncOnGoing: boolean;

  constructor(private ipcService: IpcService) {}

  ngOnInit(): void {
    this.ipcService.on(IPCMessage.RCAEDA_ANALYZE_RES, (event, res) => {
      if (res.isSuccessed) {
        this.analysisPath = res.data;
        this.isSyncOnGoing = false;
      }
    });
  }

  analyze(): void {
    this.isSyncOnGoing = true;
    this.ipcService.send(IPCMessage.RCAEDA_ANALYZE_REQ, { data: this.excelPath });
  }
}
