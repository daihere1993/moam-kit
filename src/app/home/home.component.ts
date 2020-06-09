import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { IPCResponse, BranchInfo, IPCMessage } from 'src/common/types';
import { IpcService } from '../core/services/electron/ipc.service';
import { ElectronService } from '../core/services';

enum Status {
  ON_GOING = 'on going',
  DONE = 'done',
  FAILED = 'failed',
  TIMEOUT = 'timeout',
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [IpcService],
})
export class HomeComponent implements OnInit, OnDestroy {
  public get branches$(): Observable<BranchInfo[]> {
    return this.electronService.appData$.pipe(
      map((data) => {
        return data.branches;
      }),
    );
  }

  public branch: BranchInfo;

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

  public get isSyncTimeout(): boolean {
    return this.syncStatus === Status.TIMEOUT;
  }

  public snycErrorMsg: string;

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

  public get isConnectionTimeout(): boolean {
    return this.connecToServerStatus === Status.TIMEOUT;
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

  public get isCreatePatchTimeout(): boolean {
    return this.createPatchStatus === Status.TIMEOUT;
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

  public get isUploadPatchTimeout(): boolean {
    return this.uploadPatchStatus === Status.TIMEOUT;
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

  public get isApplyPatchTimeout(): boolean {
    return this.applyPatchStatus === Status.TIMEOUT;
  }

  constructor(
    private ipcService: IpcService,
    private electronService: ElectronService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.ipcService.on(IPCMessage.TO_SYNC_CODE_FROM_MAIN, () => {
      this.toSyncCode();
    });

    this.ipcService.on(IPCMessage.REPLY_SYNC_CODE, (event, res: IPCResponse) => {
      if (res.isSuccessed) {
        this.syncStatus = Status.DONE;
      } else {
        this.syncStatus = Status.FAILED;
        const { error } = res;
        switch (error.name) {
          case IPCMessage.CONNECT_TO_SERVER_DONE:
            this.connecToServerStatus = Status.FAILED;
            this.connecToServerFailedMsg = error.message;
            this.createPatchStatus = Status.TIMEOUT;
            this.uploadPatchStatus = Status.TIMEOUT;
            this.applyPatchStatus = Status.TIMEOUT;
            break;
          case IPCMessage.CREATE_PATCH_DONE:
            this.createPatchStatus = Status.FAILED;
            this.createPatchFailedMsg = error.message;
            this.uploadPatchStatus = Status.TIMEOUT;
            this.applyPatchStatus = Status.TIMEOUT;
            break;
          case IPCMessage.UPLOAD_PATCH_TO_SERVER_DONE:
            this.uploadPatchStatus = Status.FAILED;
            this.uploadPatchFailedMsg = error.message;
            this.uploadPatchStatus = Status.TIMEOUT;
            this.applyPatchStatus = Status.TIMEOUT;
            break;
          case IPCMessage.APPLY_PATCH_TO_SERVER_DONE:
            this.applyPatchStatus = Status.FAILED;
            this.applyPatchFailedMsg = error.message;
            break;
          default:
            break;
        }
        this.snycErrorMsg = error.message;
        this.alterErrorMsg(`${error.name}: ${error.message}`);
      }
    });

    this.ipcService.on(IPCMessage.CONNECT_TO_SERVER_DONE, (event, ret: IPCResponse) => {
      if (ret.isSuccessed) {
        this.connecToServerStatus = Status.DONE;
      } else {
        this.alterErrorMsg(`Unexpected response: ${IPCMessage.CONNECT_TO_SERVER_DONE}`);
      }
    });

    this.ipcService.on(IPCMessage.CREATE_PATCH_DONE, (event, ret: IPCResponse) => {
      if (ret.isSuccessed) {
        this.createPatchStatus = Status.DONE;
      } else {
        this.alterErrorMsg(`Unexpected response: ${IPCMessage.CREATE_PATCH_DONE}`);
      }
    });

    this.ipcService.on(IPCMessage.UPLOAD_PATCH_TO_SERVER_DONE, (event, ret: IPCResponse) => {
      if (ret.isSuccessed) {
        this.uploadPatchStatus = Status.DONE;
      } else {
        this.alterErrorMsg(`Unexpected response: ${IPCMessage.UPLOAD_PATCH_TO_SERVER_DONE}`);
      }
    });

    this.ipcService.on(IPCMessage.APPLY_PATCH_TO_SERVER_DONE, (event, ret: IPCResponse) => {
      if (ret.isSuccessed) {
        this.applyPatchStatus = Status.DONE;
      } else {
        this.alterErrorMsg(`Unexpected response: ${IPCMessage.APPLY_PATCH_TO_SERVER_DONE}`);
      }
    });
  }

  ngOnDestroy(): void {
    this.ipcService.destroy();
  }

  public toSyncCode(): void {
    if (
      this.connecToServerStatus !== Status.ON_GOING &&
      this.createPatchStatus !== Status.ON_GOING &&
      this.uploadPatchStatus !== Status.ON_GOING &&
      this.applyPatchStatus !== Status.ON_GOING
    ) {
      this._toSyncCode();
      this.ipcService.send(IPCMessage.TO_SYNC_CODE, {
        data: this.branch,
      });
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

    this.snycErrorMsg = '';
  }

  private alterErrorMsg(msg: string): void {
    this.toastrService.show(msg, 'Error', {
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      status: 'danger',
      duration: 10000,
    });
  }
}
