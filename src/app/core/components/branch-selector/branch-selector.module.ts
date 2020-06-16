import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbSelectModule,
  NbFormFieldModule,
  NbInputModule,
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
    NbInputModule,
    NbFormFieldModule,
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
