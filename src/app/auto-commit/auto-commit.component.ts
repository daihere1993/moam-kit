import { Component, OnInit, OnDestroy } from '@angular/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  BranchInfo,
  AutoCommitInfo,
  IPCResponse,
  IPCMessage,
  IPCRequest,
} from '../../common/types';
import { IpcService } from '../core/services/electron/ipc.service';
import { ElectronService } from '../core/services';

enum CommitStatus {
  ON_GOING = 'on going',
  SUCCESS = 'success',
  FAILED = 'failed',
}

function isObject(obj: any): boolean {
  return typeof obj === 'object' && obj !== null;
}

function isEmptyObj(obj: { [key: string]: any }): boolean {
  if (!isObject(obj)) {
    throw new Error('Argument must be a Object.');
  }

  if (!obj) {
    return true;
  }

  for (const [, value] of Object.entries(obj)) {
    if (value) {
      return false;
    }
  }
  return true;
}

@Component({
  selector: 'app-auto-commit',
  templateUrl: './auto-commit.component.html',
  styleUrls: ['./auto-commit.component.scss'],
  providers: [IpcService],
})
export class AutoCommitComponent implements OnInit, OnDestroy {
  public get branches$(): Observable<BranchInfo[]> {
    return this.electronService.appData$.pipe(
      map((data) => {
        if (isEmptyObj(this.autoCommitInfo.branch) && data.branches && data.branches.length > 0) {
          [this.branch] = data.branches;
          return data.branches;
        }
        return data.branches || [];
      }),
    );
  }

  public branch: BranchInfo;

  private lastAutoCommitInfo: AutoCommitInfo;

  public autoCommitInfo: AutoCommitInfo = {
    prontoTitle: undefined,
    description: undefined,
    reviewBoardID: undefined,
    branch: { name: undefined, pcDir: undefined, serverDir: undefined },
    specificDiff: undefined,
  };

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

  constructor(private ipcService: IpcService, private electronService: ElectronService) {}

  ngOnInit(): void {
    this.electronService.appData$.subscribe(({ branches, lastAutoCommitInfo }) => {
      if (lastAutoCommitInfo) {
        this.branch =
          branches && branches.find((item) => item.name === lastAutoCommitInfo.branch.name);
        this.autoCommitInfo = lastAutoCommitInfo;
        this.lastAutoCommitInfo = lastAutoCommitInfo;
      }
    });

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
