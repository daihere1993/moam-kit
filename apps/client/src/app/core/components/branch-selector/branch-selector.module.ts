import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzButtonModule,
  NzModalModule,
  NzFormModule,
  NzInputModule,
  NzIconModule,
  NzSelectModule,
  NzDividerModule,
  NzNotificationServiceModule,
} from 'ng-zorro-antd';
import { BranchSelectorComponent } from './branch-selector.component';
import { BranchSettingPage } from './branch-setting/branch-setting.component';
import { PathInputModule } from '../path-field/path-field.module';
import { IpcService } from '../../services/electron/ipc.service';

@NgModule({
  declarations: [BranchSelectorComponent, BranchSettingPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PathInputModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDividerModule,
    NzNotificationServiceModule,
  ],
  providers: [IpcService],
  exports: [BranchSelectorComponent],
})
export class BranchSelectorModule {}
