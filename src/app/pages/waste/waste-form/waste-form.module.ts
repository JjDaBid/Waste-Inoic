import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteFormPageRoutingModule } from './waste-form-routing.module';

import { WasteFormPage } from './waste-form.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WasteFormPageRoutingModule,
    SharedModule
  ],
  declarations: [WasteFormPage]
})
export class WasteFormPageModule {}
