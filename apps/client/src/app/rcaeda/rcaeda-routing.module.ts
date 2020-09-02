import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RcaedaComponent } from './rcaeda.component';

export const routes: Routes = [
  {
    path: 'rcaeda',
    component: RcaedaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RcaedaRoutingModule {}
