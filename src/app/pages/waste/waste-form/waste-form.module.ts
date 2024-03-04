import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteFormPageRoutingModule } from './waste-form-routing.module';

import { WasteFormPage } from './waste-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteFormPageRoutingModule
  ],
  declarations: [WasteFormPage]
})
export class WasteFormPageModule {}
