import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NbMenuModule, NbButtonModule, NbInputModule, NbFormFieldModule, NbSpinnerModule, NbIconModule } from '@nebular/theme';
import { AutoCommitRoutingModule } from './auto-commit-routing.module';
import { AutoCommitComponent } from './auto-commit.component';
import { BranchSelectorModule } from '../core/components/branch-selector';
import { PathInputModule } from '../core/components/path-field/path-field.module';

@NgModule({
  declarations: [AutoCommitComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NbMenuModule,
    AutoCommitRoutingModule,
    PathInputModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbIconModule,
    BranchSelectorModule,
  ]
})
export class AutoCommitModule { }
