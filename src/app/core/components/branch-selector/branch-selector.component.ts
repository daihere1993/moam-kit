import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BranchInfo, IPCMessage } from 'src/common/types';
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
  providers: [IpcService],
})
export class BranchSelectorComponent {
  @Output() valueChange = new EventEmitter();

  @Input() value: BranchInfo;

  @Input() branches: BranchInfo[] = [];

  public get selectedBranch(): BranchInfo {
    if (this.value && this.branches && this.branches.length > 0) {
      return this.branches.find((branch) => branch.name === this.value.name);
    }
    return this.branches && this.branches.length > 0 ? this.branches[0] : undefined;
  }

  public set selectedBranch(value: BranchInfo) {
    this.valueChange.emit(value);
    this.value = value;
  }

  constructor(private dialogService: NbDialogService, private ipcService: IpcService) {}

  public toAddBranch(): void {
    this.dialogService.open(BranchSettingPage).onClose.subscribe((res: DialogRes) => {
      if (res && res.action === DialogAction.SAVE) {
        this.branches.push(res.content);
        setTimeout(() => {
          this.selectedBranch = res.content;
        }, 0);
        this.ipcService.send<{ key: string; value: BranchInfo[] }>(IPCMessage.STORE_DATA_REQ, {
          data: { key: 'branches', value: this.branches },
        });
      }
    });
  }

  public toEditBranch(e: Event, branch: BranchInfo): void {
    this.dialogService
      .open(BranchSettingPage, { context: { branch, isEdit: true } })
      .onClose.subscribe((res: DialogRes) => {
        if (res && res.action === DialogAction.SAVE) {
          Object.assign(branch, res.content);
          this.ipcService.send<{ key: string; value: BranchInfo[] }>(IPCMessage.STORE_DATA_REQ, {
            data: { key: 'branches', value: this.branches },
          });
        } else if (res && res.action === DialogAction.DELETE) {
          const index = this.branches.findIndex((item) => item.name === branch.name);
          if (this.selectedBranch.name === res.content.name) {
            [this.selectedBranch] = this.branches;
          }
          this.branches.splice(index, 1);
          this.ipcService.send<{ key: string; value: BranchInfo[] }>(IPCMessage.STORE_DATA_REQ, {
            data: { key: 'branches', value: this.branches },
          });
        }
      });
    e.stopPropagation();
  }

  public onSelectChange(selected: BranchInfo): void {
    this.selectedBranch = selected;
  }
}
