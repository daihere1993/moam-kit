import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule, NzButtonModule, NzInputModule, NzIconModule, NzStepsModule, NzModalModule } from 'ng-zorro-antd';
import { AutoCommitRoutingModule } from './auto-commit-routing.module';
import { AutoCommitComponent, SvnDiffConfirmModal } from './auto-commit.component';
import { BranchSelectorModule } from '../core/components/branch-selector';
import { PathInputModule } from '../core/components/path-field/path-field.module';

@NgModule({
  declarations: [AutoCommitComponent, SvnDiffConfirmModal],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCommitRoutingModule,
    PathInputModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzStepsModule,
    NzModalModule,
    BranchSelectorModule,
  ],
})
export class AutoCommitModule {}
