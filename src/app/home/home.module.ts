import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NzButtonModule,
  NzIconModule,
  NzCardModule,
  NzSpinModule,
  NzNotificationServiceModule,
} from 'ng-zorro-antd';

import { BranchSelectorModule } from '../core/components/branch-selector';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BranchSelectorModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzSpinModule,
    NzNotificationServiceModule,
  ],
})
export class HomeModule {}
