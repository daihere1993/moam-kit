import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import {
  TO_SELECT_FOLDER,
  TO_GET_SETTING,
  REPLY_GET_SETTING,
  REPLY_SYNC_CODE,
  REPLY_SELECT_FOLDER,
  TO_SYNC_CODE_FROM_MAIN,
  TO_SYNC_CODE,
  CONNECT_TO_SERVER_DONE,
  CREATE_PATCH_DONE,
  UPLOAD_PATCH_TO_SERVER_DONE,
  APPLY_PATCH_TO_SERVER_DONE,
} from 'src/common/message';
import { SettingInfo, TaskRes } from 'src/common/types';
import { ElectronService } from '../core/services';

enum Status {
  ON_GOING = 'on going',
  DONE = 'done',
  FAILED = 'failed',
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /** Sync status */
  public syncStatus: Status;

  public get isSyncOnGoing(): boolean {
    return this.syncStatus === Status.ON_GOING;
  }

  public get isSyncDone(): boolean {
    return this.syncStatus === Status.DONE;
  }

  public get isSyncFailed(): boolean {
    return this.syncStatus === Status.FAILED;
  }

  /** Server connection status */
  public connecToServerStatus: Status;

  public connecToServerFailedMsg: string;

  public get isConnectionOnGoing(): boolean {
    return this.connecToServerStatus === Status.ON_GOING;
  }

  public get isConnectionDone(): boolean {
    return this.connecToServerStatus === Status.DONE;
  }

  public get isConnectionFailed(): boolean {
    return this.connecToServerStatus === Status.FAILED;
  }

  /** Create patch status */
  public createPatchStatus: Status;

  public createPatchFailedMsg: string;

  public get isCreatePatchOnGoing(): boolean {
    return this.createPatchStatus === Status.ON_GOING;
  }

  public get isCreatePatchDone(): boolean {
    return this.createPatchStatus === Status.DONE;
  }

  public get isCreatePatchFailed(): boolean {
    return this.createPatchStatus === Status.FAILED;
  }

  /** Upload patch status */
  public uploadPatchStatus: Status;

  public uploadPatchFailedMsg: string;

  public get isUploadPatchOnGoing(): boolean {
    return this.uploadPatchStatus === Status.ON_GOING;
  }

  public get isUploadPatchDone(): boolean {
    return this.uploadPatchStatus === Status.DONE;
  }

  public get isUploadPatchFailed(): boolean {
    return this.uploadPatchStatus === Status.FAILED;
  }

  /** Apply patch status */
  public applyPatchStatus: Status;

  public applyPatchFailedMsg: string;

  public get isApplyPatchOnGoing(): boolean {
    return this.applyPatchStatus === Status.ON_GOING;
  }

  public get isApplyPatchDone(): boolean {
    return this.applyPatchStatus === Status.DONE;
  }

  public get isApplyPatchFailed(): boolean {
    return this.applyPatchStatus === Status.FAILED;
  }

  public serverDir: string;

  public pcDir: string;

  @ViewChild('pcDirInput') pcDirInput: ElementRef;

  constructor(
    private electronService: ElectronService,
    private zone: NgZone,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send(TO_GET_SETTING);
    ipcRenderer.on(REPLY_GET_SETTING, (event, settingInfo: SettingInfo) => {
      this.zone.run(() => {
        if (settingInfo) {
          this.pcDir = settingInfo.pcDir;
          this.serverDir = settingInfo.serverDir;
        }
      });
    });

    ipcRenderer.on(REPLY_SELECT_FOLDER, (event, ret) => {
      this.zone.run(() => {
        if (ret) {
          [this.pcDir] = ret;
          this.pcDirInput.nativeElement.focus();
        }
      });
    });

    ipcRenderer.on(TO_SYNC_CODE_FROM_MAIN, () => {
      this.zone.run(() => {
        this._toSyncCode();
        this.electronService.ipcRenderer.send(TO_SYNC_CODE, {
          pcDir: this.pcDir,
          serverDir: this.serverDir,
        });
      });
    });

    ipcRenderer.on(REPLY_SYNC_CODE, (event, ret: TaskRes) => {
      this.zone.run(() => {
        if (ret.isSuccessed) {
          this.syncStatus = Status.DONE;
        } else {
          this.syncStatus = Status.FAILED;
          const { error } = ret;
          switch (error.name) {
            case CONNECT_TO_SERVER_DONE:
              this.connecToServerStatus = Status.FAILED;
              this.connecToServerFailedMsg = error.message;
              break;
            case CREATE_PATCH_DONE:
              this.createPatchStatus = Status.FAILED;
              this.createPatchFailedMsg = error.message;
              break;
            case UPLOAD_PATCH_TO_SERVER_DONE:
              this.uploadPatchStatus = Status.FAILED;
              this.uploadPatchFailedMsg = error.message;
              break;
            case APPLY_PATCH_TO_SERVER_DONE:
              this.applyPatchStatus = Status.FAILED;
              this.applyPatchFailedMsg = error.message;
              break;
            default:
              break;
          }
          this.alterErrorMsg(`${error.name}: ${error.message}`);
        }
      });
    });

    ipcRenderer.on(CONNECT_TO_SERVER_DONE, (event, ret: TaskRes) => {
      this.zone.run(() => {
        if (ret.isSuccessed) {
          this.connecToServerStatus = Status.DONE;
        } else {
          this.alterErrorMsg(`Unexpected response: ${CONNECT_TO_SERVER_DONE}`);
        }
      });
    });

    ipcRenderer.on(CREATE_PATCH_DONE, (event, ret: TaskRes) => {
      this.zone.run(() => {
        if (ret.isSuccessed) {
          this.createPatchStatus = Status.DONE;
        } else {
          this.alterErrorMsg(`Unexpected response: ${CREATE_PATCH_DONE}`);
        }
      });
    });

    ipcRenderer.on(UPLOAD_PATCH_TO_SERVER_DONE, (event, ret: TaskRes) => {
      this.zone.run(() => {
        if (ret.isSuccessed) {
          this.uploadPatchStatus = Status.DONE;
        } else {
          this.alterErrorMsg(
            `Unexpected response: ${UPLOAD_PATCH_TO_SERVER_DONE}`,
          );
        }
      });
    });

    ipcRenderer.on(APPLY_PATCH_TO_SERVER_DONE, (event, ret: TaskRes) => {
      this.zone.run(() => {
        if (ret.isSuccessed) {
          this.applyPatchStatus = Status.DONE;
        } else {
          this.alterErrorMsg(
            `Unexpected response: ${APPLY_PATCH_TO_SERVER_DONE}`,
          );
        }
      });
    });
  }

  public toSelectFolder(e: Event): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send(TO_SELECT_FOLDER);
    e.stopPropagation();
  }

  public toSyncCode(): void {
    if (this.pcDir && this.serverDir) {
      this._toSyncCode();
      this.electronService.ipcRenderer.send(TO_SYNC_CODE, {
        pcDir: this.pcDir,
        serverDir: this.serverDir,
      });
    } else {
      this.alterErrorMsg(`error: pcDir & serverDir couldn't be empty.`);
    }
  }

  private _toSyncCode() {
    this.syncStatus = Status.ON_GOING;
    this.connecToServerStatus = Status.ON_GOING;
    this.createPatchStatus = Status.ON_GOING;
    this.uploadPatchStatus = Status.ON_GOING;
    this.applyPatchStatus = Status.ON_GOING;

    this.connecToServerFailedMsg = '';
    this.createPatchFailedMsg = '';
    this.uploadPatchFailedMsg = '';
    this.applyPatchFailedMsg = '';
  }

  private alterErrorMsg(msg: string): void {
    this.toastrService.show(msg, 'Error', {
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      status: 'danger',
      duration: 2000,
    });
  }
}
