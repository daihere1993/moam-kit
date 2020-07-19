import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { BranchInfo, IPCMessage } from '@moam-kit/types';
import {
  BranchSettingPage,
  DialogRes,
  DialogAction,
} from './branch-setting/branch-setting.component';
import { IpcService } from '../../services/electron/ipc.service';

@Component({
  selector: 'branch-selector',
  templateUrl: 'branch-selector.component.html',
  styleUrls: ['branch-selector.component.scss'],
})
export class BranchSelectorComponent {
  @Output() valueChange = new EventEmitter();

  @Input() disabled = false;

  @Input() value: BranchInfo;

  @Input() branches: BranchInfo[] = [];

  public setSelection(value: BranchInfo) {
    this.value = value;
    this.valueChange.emit(value);
  }

  constructor(private modalService: NzModalService, private ipcService: IpcService) {}

  public toAddBranch(): void {
    this.modalService
      .create({ nzContent: BranchSettingPage })
      .afterClose.subscribe((res: DialogRes) => {
        if (res && res.action === DialogAction.SAVE) {
          setTimeout(() => {
            this.branches.push(res.content);
            this.setSelection(res.content);
          }, 0);
          this.ipcService.send<{ key: string; value: BranchInfo[] }>(IPCMessage.STORE_DATA_REQ, {
            data: { key: 'branches', value: this.branches },
          });
        }
      });
  }

  public toEditBranch(e: Event, branch: BranchInfo): void {
    const _branch = { ...branch };
    this.modalService
      .create({
        nzContent: BranchSettingPage,
        nzComponentParams: { branch: _branch, isEdit: true },
      })
      .afterClose.subscribe((res: DialogRes) => {
        if (res && res.action === DialogAction.SAVE) {
          Object.assign(branch, res.content);
          this.ipcService.send<{ key: string; value: BranchInfo[] }>(IPCMessage.STORE_DATA_REQ, {
            data: { key: 'branches', value: this.branches },
          });
        } else if (res && res.action === DialogAction.DELETE) {
          const index = this.branches.findIndex((item) => item.name === branch.name);
          this.branches.splice(index, 1);
          if (this.value && this.value.name === res.content.name) {
            this.setSelection(this.branches[0]);
          }
          this.ipcService.send<{ key: string; value: BranchInfo[] }>(IPCMessage.STORE_DATA_REQ, {
            data: { key: 'branches', value: this.branches },
          });
        }
      });
    e.stopPropagation();
  }
}
