import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig), NgApexchartsModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
