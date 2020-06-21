import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule, NzButtonModule, NzInputModule, NzIconModule } from 'ng-zorro-antd';
import { AutoCommitRoutingModule } from './auto-commit-routing.module';
import { AutoCommitComponent } from './auto-commit.component';
import { BranchSelectorModule } from '../core/components/branch-selector';
import { PathInputModule } from '../core/components/path-field/path-field.module';

@NgModule({
  declarations: [AutoCommitComponent],
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
    BranchSelectorModule,
  ],
})
export class AutoCommitModule {}
