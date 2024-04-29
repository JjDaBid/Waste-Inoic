import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { LogoComponent } from './component/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoToolbarComponent } from './component/logo-toolbar/logo-toolbar.component';
import { RouterModule } from '@angular/router';
import { GraphicComponent } from './component/graphic/graphic.component';
import { SecondChartComponent } from './component/second-chart/second-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    LogoToolbarComponent,
    GraphicComponent,
    SecondChartComponent

  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    LogoToolbarComponent,
    GraphicComponent,
    SecondChartComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgApexchartsModule
  ]
})
export class SharedModule { }
