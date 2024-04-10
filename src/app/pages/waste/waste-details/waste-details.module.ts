import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteDetailsPageRoutingModule } from './waste-details-routing.module';

import { WasteDetailsPage } from './waste-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteDetailsPageRoutingModule,
    SharedModule
  ],
  declarations: [WasteDetailsPage]
})
export class WasteDetailsPageModule {}
