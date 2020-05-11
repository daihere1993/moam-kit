import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ElectronService } from '../core/services';
import { SettingInfo } from '../../types';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  public host = '1';

  public username = '1';

  public password = '1';

  public serverDir = '1';

  public pcDir = '1';

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
    private ref: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    const { ipcRenderer } = this.electronService;
    // this.settingInfo = {
    //   host: '1',
    //   username: '1',
    //   password: '1',
    //   serverDir: '1',
    //   pcDir: '1',
    // };
    ipcRenderer.send('to-getSetting');

    ipcRenderer.on('getSetting-reply', (event, settingInfo: SettingInfo) => {
      if (settingInfo) {
        setTimeout(() => {
          this.settingInfo = settingInfo;
        }, 0);

        // this.ref.detectChanges();
      }
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
