import { Component, OnInit, ViewChild, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteReportPageRoutingModule } from './waste-report-routing.module';

import { WasteReportPage } from './waste-report.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteReportPageRoutingModule,
    SharedModule
  ],
  declarations: [WasteReportPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WasteReportPageModule {}
