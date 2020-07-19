import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzNotificationServiceModule, NzFormModule, NzInputModule, NzButtonModule } from 'ng-zorro-antd';

import { SettingComponent } from './setting.component';
import { SettingRoutingModule } from './setting-routing.module';

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingRoutingModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationServiceModule,
  ],
})
export class SettingModule {}
