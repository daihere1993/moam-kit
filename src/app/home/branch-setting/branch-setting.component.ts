import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from 'src/app/core/services';
import { TO_SELECT_FOLDER, REPLY_SELECT_FOLDER } from 'src/common/message';
import { BranchInfo } from 'src/common/types';
import {
  NbDialogRef,
  NbToastrService,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';

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
export class BranchSettingPage implements OnInit {
  public branch: BranchInfo = {
    name: '',
    pcDir: '',
    serverDir: '',
  };

  public isEdit: boolean;

  constructor(
    private dialogRef: NbDialogRef<BranchSettingPage>,
    private electronService: ElectronService,
    private zone: NgZone,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.on(REPLY_SELECT_FOLDER, (event, ret) => {
      this.zone.run(() => {
        if (ret) {
          [this.branch.pcDir] = ret;
        }
      });
    });
  }

  public toSelectFolder(e: Event): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send(TO_SELECT_FOLDER);
    e.stopPropagation();
  }

  public toSave(): void {
    this.dialogRef.close({
      action: DialogAction.SAVE,
      content: this.branch,
    });
    this.toastrService.show('Success', 'Save', {
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      duration: 8000,
    });
  }

  public toDelete(): void {
    this.dialogRef.close({
      action: DialogAction.DELETE,
      content: this.branch,
    });
  }

  public toClose(): void {
    this.dialogRef.close({
      action: DialogAction.CANCEL,
    });
  }
}
