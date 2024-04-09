import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteReportPageRoutingModule } from './waste-report-routing.module';

import { WasteReportPage } from './waste-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteReportPageRoutingModule
  ],
  declarations: [WasteReportPage]
})
export class WasteReportPageModule {}
