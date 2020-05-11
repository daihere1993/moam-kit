import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { ElectronService } from '../core/services';
import { SettingInfo } from '../../types';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  public host: string;

  public username: string;

  public password: string;

  public serverDir: string;

  public pcDir: string;

  private get settingInfo(): SettingInfo {
    return {
      host: this.host,
      username: this.username,
      password: this.password,
      serverDir: this.serverDir,
      pcDir: this.pcDir,
    };
  }

  private set settingInfo(info: SettingInfo) {
    this.host = info.host;
    this.username = info.username;
    this.password = info.password;
    this.serverDir = info.serverDir;
    this.pcDir = info.pcDir;
  }

  @ViewChild('pcDirInput') pcDirInput: ElementRef;

  constructor(
    private electronService: ElectronService,
    private zone: NgZone,
  ) {}

  public ngOnInit(): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send('to-getSetting');
    ipcRenderer.on('getSetting-reply', (event, settingInfo: SettingInfo) => {
      this.zone.run(() => {
        if (settingInfo) {
          this.settingInfo = settingInfo;
        }
      });
    });

    ipcRenderer.on('selectFolder-reply', (event, arg) => {
      if (arg) {
        [this.pcDir] = arg;
        this.pcDirInput.nativeElement.focus();
      }
    });
  }

  public toSelectFolder(e: Event): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send('to-selectFolder');
    e.stopPropagation();
  }

  public toSave(): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send('to-storeSetting', this.settingInfo);
  }
}
