import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { SSHData, IPCMessage, IPCResponse } from '../../common/types';
import { IpcService } from '../core/services/electron/ipc.service';
import { ElectronService } from '../core/services';

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
    this.host = info.host;
    this.username = info.username;
    this.password = info.password;
  }

  constructor(
    private toastrService: NbToastrService,
    private ipcService: IpcService,
    private electronService: ElectronService,
  ) {}

  public ngOnInit(): void {
    this.electronService.appData$.subscribe((data) => {
      this.sshInfo = data.ssh;
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
