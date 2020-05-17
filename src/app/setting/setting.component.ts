import {
  Component,
  OnInit,
  NgZone,
} from '@angular/core';
import { TO_GET_SETTING, REPLY_GET_SETTING, TO_STORE_SETTING } from 'src/common/message';
import { ElectronService } from '../core/services';
import { SSHInfo } from '../../common/types';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  public host: string;

  public username: string;

  public password: string;

  private get sshInfo(): SSHInfo {
    return {
      host: this.host,
      username: this.username,
      password: this.password,
    };
  }

  private set sshInfo(info: SSHInfo) {
    this.host = info.host;
    this.username = info.username;
    this.password = info.password;
  }

  constructor(private electronService: ElectronService, private zone: NgZone) {}

  public ngOnInit(): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send(TO_GET_SETTING);
    ipcRenderer.on(REPLY_GET_SETTING, (event, sshInfo: SSHInfo) => {
      this.zone.run(() => {
        if (sshInfo) {
          this.sshInfo = sshInfo;
        }
      });
    });
  }

  public toSave(): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send(TO_STORE_SETTING, this.sshInfo);
  }
}
