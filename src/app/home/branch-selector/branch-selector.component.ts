import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { BranchInfo } from 'src/common/types';
import { ElectronService } from 'src/app/core/services';
import { TO_STORE_SETTING } from 'src/common/message';
import { BranchSettingPage, DialogRes, DialogAction } from '../branch-setting/branch-setting.component';

@Component({
  selector: 'branch-selector',
  templateUrl: 'branch-selector.component.html',
  styleUrls: ['branch-selector.component.scss'],
})
export class BranchSelectorComponent implements OnChanges {
  @Input() branches: BranchInfo[] = [];

  public selectedBranch: BranchInfo;

  constructor(
    private dialogService: NbDialogService,
    private electronService: ElectronService,
  ) {}

  ngOnChanges({ branches }: { branches: SimpleChange }): void {
    if (branches.previousValue === undefined && branches.currentValue) {
      [this.selectedBranch] = this.branches;
    }
  }

  public toAddBranch(): void {
    this.dialogService
      .open(BranchSettingPage)
      .onClose.subscribe((res: DialogRes) => {
        if (res && res.action === DialogAction.SAVE) {
          this.branches.push(res.content);
          this.electronService.ipcRenderer.send(TO_STORE_SETTING, {
            branches: this.branches,
          });
        }
      });
  }

  public toEditBranch(e: Event, branch: BranchInfo): void {
    this.dialogService
      .open(BranchSettingPage, { context: { branch, isEdit: true } })
      .onClose.subscribe((res: DialogRes) => {
        if (res && res.action === DialogAction.SAVE) {
          Object.assign(branch, res.content);
          this.electronService.ipcRenderer.send(TO_STORE_SETTING, {
            branches: this.branches,
          });
        } else if (res && res.action === DialogAction.DELETE) {
          const index = this.branches.findIndex((item) => item.name === branch.name);
          this.branches.splice(index, 1);
          this.electronService.ipcRenderer.send(TO_STORE_SETTING, {
            branches: this.branches,
          });
        }
      });
    e.stopPropagation();
  }

  public onSelectChange(selected: BranchInfo): void {
    this.selectedBranch = selected;
  }
}
