import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { SSHData, IPCMessage } from '../../common/types';
import { IpcService } from '../core/services/electron/ipc.service';
import { ElectronService } from '../core/services';
import { StoreService } from '../core/services/electron/store.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  providers: [IpcService],
})
export class SettingComponent implements OnInit {
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
    private toastrService: NbToastrService,
    private ipcService: IpcService,
    private store: StoreService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.store.getData().subscribe((data) => {
      this.sshInfo = data.ssh;
      this.changeDetectorRef.detectChanges();
    });
  }

  public toSave(): void {
    this.ipcService.send<{ key: string; value: SSHData }>(IPCMessage.STORE_DATA_REQ, {
      data: { key: 'ssh', value: this.sshInfo },
    });
    this.toastrService.show('Success', 'Setting', {
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      duration: 800,
    });
  }
}
