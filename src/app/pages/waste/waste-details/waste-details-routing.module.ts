import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WasteDetailsPage } from './waste-details.page';

const routes: Routes = [
  {
    path: '',
    component: WasteDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WasteDetailsPageRoutingModule {}
