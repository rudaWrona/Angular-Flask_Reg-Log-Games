import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GryPage } from './gry.page';

const routes: Routes = [
  {
    path: '',
    component: GryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GryPageRoutingModule {}
