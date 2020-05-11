import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import { ElectronService } from '../core/services';
import { SSHInfo } from '../../types';

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
    ipcRenderer.send('to-getSetting');
    ipcRenderer.on('getSetting-reply', (event, sshInfo: SSHInfo) => {
      this.zone.run(() => {
        if (sshInfo) {
          this.sshInfo = sshInfo;
        }
      });
    });
  }

  public toSave(): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send('to-storeSetting', this.sshInfo);
  }
}
