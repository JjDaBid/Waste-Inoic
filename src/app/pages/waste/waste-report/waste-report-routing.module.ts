import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WasteReportPage } from './waste-report.page';

const routes: Routes = [
  {
    path: '',
    component: WasteReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WasteReportPageRoutingModule {}
