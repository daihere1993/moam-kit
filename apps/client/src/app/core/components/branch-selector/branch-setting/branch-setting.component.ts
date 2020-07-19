import { Component, OnInit } from '@angular/core';
import { BranchInfo } from '@moam-kit/types';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  public validateForm: FormGroup;

  public branch: BranchInfo = {
    name: '',
    pcDir: '',
    serverDir: '',
  };

  public isEdit: boolean;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      branchName: [null, [Validators.required]],
      serverDir: [null, [Validators.required]],
      pcDir: [null, [Validators.required]],
    });
  }

  public toSave(): void {
    this.modal.close({
      action: DialogAction.SAVE,
      content: this.branch,
    });
    this.notification.create('success', 'Success', '', { nzPlacement: 'bottomRight' });
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
