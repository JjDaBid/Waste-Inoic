import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteDetailsPageRoutingModule } from './waste-details-routing.module';

import { WasteDetailsPage } from './waste-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteDetailsPageRoutingModule
  ],
  declarations: [WasteDetailsPage]
})
export class WasteDetailsPageModule {}
