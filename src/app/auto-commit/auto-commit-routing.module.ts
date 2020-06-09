import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoCommitComponent } from './auto-commit.component';

export const routes: Routes = [
  {
    path: 'auto-commit',
    component: AutoCommitComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoCommitRoutingModule {}
