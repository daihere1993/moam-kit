import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NbMenuModule } from '@nebular/theme';

import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, NbMenuModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
