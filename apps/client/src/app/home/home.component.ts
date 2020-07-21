import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';
import { IPCResponse, BranchInfo, IPCMessage, SSHData } from '@moam-kit/types';
import { IpcService } from '../core/services/electron/ipc.service';
import { StoreService } from '../core/services/electron/store.service';
import { Steps, StepStatus, StepsStatus, SyncCodeStep } from '@moam-kit/steps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [IpcService],
})
export class HomeComponent implements OnInit, OnDestroy {
  public branches$: Observable<BranchInfo[]>;

  public branch: BranchInfo;

  public steps: Steps;

  public lastSyncDate: Date;

  /** Sync status */
  public get isSyncOnGoing(): boolean {
    return this.steps.status === StepsStatus.ONGOING;
  }

  public set alertMessage(message: string) {
    if (message) {
      this.notification.create('error', 'Error', message, { nzPlacement: 'bottomRight' });
    }
  }

  private ssh: SSHData;

  private get isReady(): boolean {
    if (!this.ssh) {
      this.alertMessage = 'Please fill corresponding setting.';
      return false;
    } else if (!this.branch) {
      this.alertMessage = 'Please add a branch first.'
      return false;
    } else if (this.isSyncOnGoing) {
      this.alertMessage = 'Sync is on going.';
      return false;
    }
    return true;
  }

  constructor(
    private ipcService: IpcService,
    private store: StoreService,
    private notification: NzNotificationService,
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.steps = new Steps([
      { title: 'Step 1', description: 'Connect to remote.', type: SyncCodeStep.CONNECT_TO_SERVER },
      {
        title: 'Step 2',
        description: 'Create diff based on local project.',
        type: SyncCodeStep.CREATE_DIFF,
      },
      { title: 'Step 3', description: 'Upload diff into remote.', type: SyncCodeStep.UPLOAD_DIFF },
      {
        title: 'Step 4',
        description: 'Apply diff to remote project.',
        type: SyncCodeStep.APPLY_DIFF,
      },
    ]);

    this.branches$ = this.store.getData().pipe(
      tap(({ ssh, branches }) => {
        this.ssh = ssh;
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
        this.steps.setStatusForSingleStep(res.data, StepStatus.FINISHED);
      } else {
        const { error } = res;
        this.steps.errorInfo = error.message;
        this.steps.setStatusForSingleStep(error.name, StepStatus.FAILED);
      }
    });
  }

  ngOnDestroy(): void {
    this.ipcService.destroy();
  }

  public toSyncCode(): void {
    if (this.isReady) {
      this.steps.start();

      this.ipcService.send(IPCMessage.SYNC_CODE_REQ, {
        data: this.branch,
      });
    }
  }
}
