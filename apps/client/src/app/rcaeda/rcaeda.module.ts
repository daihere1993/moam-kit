import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RcaedaComponent } from './rcaeda.component';
import { RcaedaRoutingModule } from './rcaeda-routing.module';
import { NzInputModule, NzButtonModule, NzSpinModule, NzIconModule } from 'ng-zorro-antd';
import { PathInputModule } from '../core/components/path-field/path-field.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RcaedaComponent],
  imports: [
    CommonModule,
    FormsModule,
    RcaedaRoutingModule,
    NzInputModule,
    NzButtonModule,
    NzSpinModule,
    NzIconModule,
    PathInputModule,
  ],
})
export class RcaedaModule {}
