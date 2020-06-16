import { Component } from '@angular/core';
import { BranchInfo } from 'src/common/types';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NzModalRef } from 'ng-zorro-antd';

export enum DialogAction {
  CANCEL = 'cancel',
  SAVE = 'save',
  DELETE = 'delete',
}

export interface DialogRes {
  action: DialogAction;
  content?: BranchInfo;
}

@Component({
  selector: 'branch-setting-page',
  templateUrl: 'branch-setting.component.html',
  styleUrls: ['branch-setting.component.scss'],
})
export class BranchSettingPage {
  public branch: BranchInfo = {
    name: '',
    pcDir: '',
    serverDir: '',
  };

  public isEdit: boolean;

  constructor(
    private modal: NzModalRef,
    private toastrService: NbToastrService,
  ) {}

  public toSave(): void {
    this.modal.close({
      action: DialogAction.SAVE,
      content: this.branch,
    });
    this.toastrService.show('Success', 'Save', {
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      duration: 8000,
    });
  }

  public toDelete(): void {
    this.modal.close({
      action: DialogAction.DELETE,
      content: this.branch,
    });
  }

  public toClose(): void {
    this.modal.close({
      action: DialogAction.CANCEL,
    });
  }
}
