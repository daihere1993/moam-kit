import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { ElectronService } from '../core/services';
import { SettingInfo } from '../../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public displayProgress = false;

  public isSyncDone = false;

  public serverDir: string;

  public pcDir: string;

  @ViewChild('pcDirInput') pcDirInput: ElementRef;

  constructor(private electronService: ElectronService, private zone: NgZone) {}

  ngOnInit(): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send('to-getSetting');
    ipcRenderer.on('getSetting-reply', (event, settingInfo: SettingInfo) => {
      this.zone.run(() => {
        if (settingInfo) {
          this.pcDir = settingInfo.pcDir;
          this.serverDir = settingInfo.serverDir;
        }
      });
    });

    ipcRenderer.on('syncCode-reply', (event, ret) => {
      this.zone.run(() => {
        if (ret === 0) {
          this.isSyncDone = true;
        } else {
          console.log(ret);
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

  public toSyncCode(): void {
    this.isSyncDone = false;
    this.displayProgress = true;
    this.electronService.ipcRenderer.send('to-syncCode');
  }
}
