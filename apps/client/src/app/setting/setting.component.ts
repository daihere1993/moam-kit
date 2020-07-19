import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { SSHData, IPCMessage } from '@moam-kit/types';
import { IpcService } from '../core/services/electron/ipc.service';
import { StoreService } from '../core/services/electron/store.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [IpcService],
})
export class SettingComponent implements OnInit {
  public validateForm: FormGroup;

  public host: string;

  public username: string;

  public password: string;

  private get sshInfo(): SSHData {
    return {
      host: this.host,
      username: this.username,
      password: this.password,
    };
  }

  private set sshInfo(info: SSHData) {
    if (info) {
      this.host = info.host;
      this.username = info.username;
      this.password = info.password;
    }
  }

  constructor(
    private notification: NzNotificationService,
    private ipcService: IpcService,
    private store: StoreService,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.validateForm = this.fb.group({
      host: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.store.getData().subscribe((data) => {
      this.sshInfo = data.ssh;
      this.changeDetectorRef.detectChanges();
    });
  }

  public toSave(): void {
    this.ipcService.send<{ key: string; value: SSHData }>(IPCMessage.STORE_DATA_REQ, {
      data: { key: 'ssh', value: this.sshInfo },
    });
    this.notification.create('success', 'Success', '', { nzPlacement: 'bottomRight' });
  }
}
