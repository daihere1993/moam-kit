import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';

import { NavbarModule } from './components';
import { CacheRouteReuseStrategy } from './strategy/cache-route-reuse-strategy';

@NgModule({
  imports: [CommonModule, NavbarModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CacheRouteReuseStrategy,
    },
  ],
  exports: [NavbarModule],
})
export class CoreModule {}
