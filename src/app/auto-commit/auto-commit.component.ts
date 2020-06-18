import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  BranchInfo,
  AutoCommitInfo,
  IPCResponse,
  IPCMessage,
  IPCRequest,
} from '../../common/types';
import { IpcService } from '../core/services/electron/ipc.service';
import { StoreService } from '../core/services/electron/store.service';

enum CommitStatus {
  ON_GOING = 'on going',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Component({
  selector: 'app-auto-commit',
  templateUrl: './auto-commit.component.html',
  styleUrls: ['./auto-commit.component.scss'],
  providers: [IpcService],
})
export class AutoCommitComponent implements OnInit, OnDestroy {
  public validateForm: FormGroup;

  public branches$: Observable<BranchInfo[]>;

  /** Form fields */
  public prontoTitle: string;
  public description: string;
  public reviewBoardID: number;
  public branch: BranchInfo;
  public specificDiff: string;

  private lastAutoCommitInfo: AutoCommitInfo;

  private get autoCommitInfo(): AutoCommitInfo {
    return {
      prontoTitle: this.prontoTitle,
      description: this.description,
      reviewBoardID: this.reviewBoardID,
      branch: this.branch,
      specificDiff: this.specificDiff,
    };
  }

  /** Commit status */
  public commitStatus: CommitStatus;

  public get isOnGoing(): boolean {
    return this.commitStatus === CommitStatus.ON_GOING;
  }

  public get isSuccess(): boolean {
    return this.commitStatus === CommitStatus.SUCCESS;
  }

  public get isFailed(): boolean {
    return this.commitStatus === CommitStatus.FAILED;
  }

  public logs: string[] = [];

  constructor(
    private ipcService: IpcService,
    private store: StoreService,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      prontoTitle: [null, [Validators.required]],
      description: [null, [Validators.required]],
      reviewBoardID: [null, [Validators.required]],
      specificDiff: [null, [Validators.required]],
    });

    this.branches$ = this.store.getData().pipe(
      tap(({ branches, lastAutoCommitInfo }) => {
        if (!this.branch && branches && branches.length > 0) {
          [this.branch] = branches;
        }
        if (lastAutoCommitInfo) {
          this.branch = branches.find((item) => item.name === lastAutoCommitInfo.branch.name);
          this.prontoTitle = lastAutoCommitInfo.prontoTitle;
          this.description = lastAutoCommitInfo.description;
          this.reviewBoardID = lastAutoCommitInfo.reviewBoardID;
          this.specificDiff = lastAutoCommitInfo.specificDiff;
          this.lastAutoCommitInfo = lastAutoCommitInfo;
        }
        this.changeDetectorRef.detectChanges();
      }),
      map((data) => {
        return data.branches || [];
      }),
    );

    this.ipcService.on(IPCMessage.REPLY_AUTO_COMMIT_REQ, (event, res: IPCResponse) => {
      if (res.isSuccessed) {
        this.commitStatus = CommitStatus.SUCCESS;
        this.logs.unshift(...res.data.split('\n'));
      } else {
        this.commitStatus = CommitStatus.FAILED;
        this.logs.unshift(...res.error.message.split('\n'));
      }
    });

    this.ipcService.on(IPCMessage.REPLY_STOP_AUTO_COMMIT, (event, res: IPCResponse) => {
      if (res.isSuccessed) {
        this.commitStatus = undefined;
      }
    });

    this.ipcService.on(IPCMessage.AUTO_COMMIT_HEARTBEAT, (event, res: IPCResponse) => {
      this.logs.unshift(res.data);
    });
  }

  ngOnDestroy(): void {
    this.ipcService.destroy();
  }

  public toAutoCommit(): void {
    if (this.isOnGoing) {
      this.logs.unshift(`[${moment().format()}] Stopped`);
      this.ipcService.send(IPCMessage.STOP_AUTO_COMMIT);
    } else {
      if (!this.lastAutoCommitInfo || this.hasInfoChanged()) {
        this.ipcService.send(IPCMessage.STORE_DATA_REQ, {
          data: { key: 'lastAutoCommitInfo', value: this.autoCommitInfo },
        });
      }
      this.commitStatus = CommitStatus.ON_GOING;
      const req: IPCRequest<AutoCommitInfo> = { data: this.autoCommitInfo };
      this.ipcService.send(IPCMessage.AUTO_COMMIT_REQ, req);
    }
  }

  private hasInfoChanged(): boolean {
    let hasChanged: boolean;
    Object.entries(this.lastAutoCommitInfo).forEach(([key, value]) => {
      if (value !== this.autoCommitInfo[key]) {
        hasChanged = true;
      }
    });

    return hasChanged;
  }
}
