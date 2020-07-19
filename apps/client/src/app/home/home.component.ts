import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';
import { IPCResponse, BranchInfo, IPCMessage } from '@moam-kit/types';
import { IpcService } from '../core/services/electron/ipc.service';
import { StoreService } from '../core/services/electron/store.service';

enum Status {
  ON_GOING = 'process',
  DONE = 'finish',
  FAILED = 'error',
  TIMEOUT = 'wait',
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [IpcService],
})
export class HomeComponent implements OnInit, OnDestroy {
  public branches$: Observable<BranchInfo[]>;

  public branch: BranchInfo;

  public steps = [];

  public lastSyncDate: Date;

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
  public set connecToServerStatus(value: string) {
    this.steps[0].status = value;
  }

  public connecToServerFailedMsg: string;

  /** Create patch status */
  public set createPatchStatus(value: string) {
    this.steps[1].status = value;
  }

  public createPatchFailedMsg: string;

  /** Upload patch status */
  public set uploadPatchStatus(value: string) {
    this.steps[2].status = value;
  }

  public uploadPatchFailedMsg: string;

  /** Apply patch status */
  public set applyPatchStatus(value: string) {
    this.steps[3].status = value;
  }

  public applyPatchFailedMsg: string;

  public set alertMessage(message: string) {
    if (message) {
      this.notification.create('error', 'Error', message, { nzPlacement: 'bottomRight' });
    }
  }

  constructor(
    private ipcService: IpcService,
    private store: StoreService,
    private notification: NzNotificationService,
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.steps = [
      { title: 'Step 1', description: 'Connect to remote.', status: 'wait' },
      { title: 'Step 2', description: 'Create diff based on local project.', status: 'wait' },
      { title: 'Step 3', description: 'Upload diff into remote.', status: 'wait' },
      { title: 'Step 4', description: 'Apply diff to remote project.', status: 'wait' },
    ];

    this.branches$ = this.store.getData().pipe(
      tap(({ branches }) => {
        if (!this.branch && branches && branches.length > 0) {
          this.zone.run(() => {
            [this.branch] = branches;
            this.changeDetectorRef.detectChanges();
          });
        }
      }),
      map((data) => {
        return data.branches || [];
      }),
    );

    this.ipcService.on(IPCMessage.SYNC_CODE_FROM_MAIN_REQ, () => {
      this.toSyncCode();
    });

    this.ipcService.on(IPCMessage.SYNC_CODE_RES, (event, res: IPCResponse) => {
      this.lastSyncDate = new Date();

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
        this.alertMessage = `${error.name}: ${error.message}`;
      }
    });

    this.ipcService.on(IPCMessage.CONNECT_TO_SERVER_DONE, (event, ret: IPCResponse) => {
      if (ret.isSuccessed) {
        this.connecToServerStatus = Status.DONE;
        this.createPatchStatus = Status.ON_GOING;
      } else {
        this.alertMessage = `Unexpected response: ${IPCMessage.CONNECT_TO_SERVER_DONE}`;
      }
    });

    this.ipcService.on(IPCMessage.CREATE_PATCH_DONE, (event, ret: IPCResponse) => {
      if (ret.isSuccessed) {
        this.createPatchStatus = Status.DONE;
        this.uploadPatchStatus = Status.ON_GOING;
      } else {
        this.alertMessage = `Unexpected response: ${IPCMessage.CREATE_PATCH_DONE}`;
      }
    });

    this.ipcService.on(IPCMessage.UPLOAD_PATCH_TO_SERVER_DONE, (event, ret: IPCResponse) => {
      if (ret.isSuccessed) {
        this.uploadPatchStatus = Status.DONE;
        this.applyPatchStatus = Status.ON_GOING;
      } else {
        this.alertMessage = `Unexpected response: ${IPCMessage.UPLOAD_PATCH_TO_SERVER_DONE}`;
      }
    });

    this.ipcService.on(IPCMessage.APPLY_PATCH_TO_SERVER_DONE, (event, ret: IPCResponse) => {
      if (ret.isSuccessed) {
        this.applyPatchStatus = Status.DONE;
      } else {
        this.alertMessage = `Unexpected response: ${IPCMessage.APPLY_PATCH_TO_SERVER_DONE}`;
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
      this.syncStatus = Status.ON_GOING;
      this.connecToServerStatus = Status.ON_GOING;
      this.createPatchStatus = Status.TIMEOUT;
      this.uploadPatchStatus = Status.TIMEOUT;
      this.applyPatchStatus = Status.TIMEOUT;

      this.connecToServerFailedMsg = '';
      this.createPatchFailedMsg = '';
      this.uploadPatchFailedMsg = '';
      this.applyPatchFailedMsg = '';
      this.snycErrorMsg = '';

      this.ipcService.send(IPCMessage.SYNC_CODE_REQ, {
        data: this.branch,
      });
    }
  }
}
