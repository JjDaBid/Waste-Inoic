import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteFormPageRoutingModule } from './waste-form-routing.module';

import { WasteFormPage } from './waste-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WasteFormPageRoutingModule
  ],
  declarations: [WasteFormPage]
})
export class WasteFormPageModule {}
