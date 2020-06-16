import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  NbSelectModule,
  NbDialogModule,
  NbButtonModule,
  NbIconModule,
  NbCardModule,
} from '@nebular/theme';
import { BranchSelectorComponent } from './branch-selector.component';
import { BranchSettingPage } from './branch-setting/branch-setting.component';
import { PathInputModule } from '../path-field/path-field.module';
import { IpcService } from '../../services/electron/ipc.service';

@NgModule({
  declarations: [BranchSelectorComponent, BranchSettingPage],
  imports: [
    CommonModule,
    FormsModule,
    PathInputModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbCardModule,
    NbDialogModule.forChild({ closeOnBackdropClick: false }),
  ],
  providers: [IpcService],
  exports: [BranchSelectorComponent],
})
export class BranchSelectorModule {}
