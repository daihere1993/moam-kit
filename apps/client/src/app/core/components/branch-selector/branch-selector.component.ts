import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { BranchInfo, IPCMessage, StoreAction } from '@moam-kit/types';
import {
  BranchSettingPage,
  DialogRes,
  DialogAction,
} from './branch-setting/branch-setting.component';
import { IpcService } from '../../services/electron/ipc.service';
import { StoreService } from '../../services/electron/store.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'branch-selector',
  templateUrl: 'branch-selector.component.html',
  styleUrls: ['branch-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchSelectorComponent implements OnInit {
  private selectedBranchName: string;
  
  @Output() change = new EventEmitter();

  @Input() disabled = false;

  branches$: Observable<BranchInfo[]>;

  public selectedBranch: BranchInfo;

  public setSelection(value: BranchInfo) {
    this.selectedBranch = value;
    this.selectedBranchName = value.name;
    this.change.emit(value);
  }

  constructor(
    private modalService: NzModalService,
    private ipcService: IpcService,
    private store: StoreService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.branches$ = this.store.getBranches().pipe(
      tap((branches) => {
        if (!this.selectedBranchName && branches.length > 0) {
          this.setSelection(branches[0]);
        } else {
          this.selectedBranch = branches.find((item) => item.name === this.selectedBranchName);
        }
      }),
    );
  }

  public toAddBranch(): void {
    this.modalService
      .create({ nzContent: BranchSettingPage })
      .afterClose.subscribe((res: DialogRes) => {
        if (res && res.action === DialogAction.SAVE) {
          this.selectedBranchName = res.content.name;
          this.ipcService.send<{ key: string; value: BranchInfo; action: StoreAction }>(
            IPCMessage.STORE_DATA_REQ,
            {
              data: { key: 'branches', value: res.content, action: StoreAction.ADD_ITEM },
            },
          );
        }
      });
  }

  public toEditBranch(e: Event, branch: BranchInfo): void {
    const _branch = { ...branch };
    this.modalService
      .create({
        nzContent: BranchSettingPage,
        nzComponentParams: { branch: _branch, isEdit: true },
      })
      .afterClose.subscribe((res: DialogRes) => {
        if (res && res.action === DialogAction.SAVE) {
          if (this.selectedBranchName && this.selectedBranchName === branch.name) {
            this.selectedBranchName = res.content.name;
          }
          this.ipcService.send<{
            key: string;
            value: BranchInfo;
            name: string;
            action: StoreAction;
          }>(IPCMessage.STORE_DATA_REQ, {
            data: {
              key: 'branches',
              value: res.content,
              name: branch.name,
              action: StoreAction.EDIT_ITEM,
            },
          });
        } else if (res && res.action === DialogAction.DELETE) {
          if (this.selectedBranchName && this.selectedBranchName === branch.name) {
            this.selectedBranchName = null;
          }
          this.ipcService.send<{ key: string; name: string; action: StoreAction }>(
            IPCMessage.STORE_DATA_REQ,
            {
              data: { key: 'branches', name: branch.name, action: StoreAction.DELETE_ITEM },
            },
          );
        }
      });
    e.stopPropagation();
  }
}
