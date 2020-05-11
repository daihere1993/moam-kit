import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarModule } from './components';

@NgModule({
  imports: [CommonModule, NavbarModule],
  exports: [NavbarModule],
})
export class CoreModule {}
