import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  NbButtonModule,
  NbInputModule,
  NbFormFieldModule,
  NbIconModule,
  NbSpinnerModule,
  NbCardModule,
  NbAlertModule,
  NbSelectModule,
  NbDialogModule,
} from '@nebular/theme';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BranchSelectorComponent } from './branch-selector/branch-selector.component';
import { BranchSettingPage } from './branch-setting/branch-setting.component';

@NgModule({
  declarations: [HomeComponent, BranchSelectorComponent, BranchSettingPage],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbSpinnerModule,
    NbCardModule,
    NbAlertModule,
    NbSelectModule,
    NbAlertModule,
    NbDialogModule.forChild({ closeOnBackdropClick: false }),
  ],
})
export class HomeModule {}
