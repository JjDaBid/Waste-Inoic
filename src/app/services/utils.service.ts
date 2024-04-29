import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


import Swal from 'sweetalert2'
import Toastify from 'toastify-js'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastController = inject(ToastController);
  router = inject(Router);
  

  Swal = require('sweetalert2')


  loading(){
    return this.loadingCtrl.create( { spinner: 'crescent' } )
  }

  async presentToast(opts?: ToastOptions){
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value))
  }

  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }

  async takePicture(promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: "Selecciona la imagen",
      promptLabelPicture: "Toma una foto"
    });
  };

  async showConfirmation(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success') {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      cancelButtonColor: "#666666,",
      confirmButtonColor: "#9ACD32",
      confirmButtonText: 'Ok',
      scrollbarPadding: false,
      backdrop: false
    });
  }

  async showToast( text: string, position: string, duration: number, color: string){
    return Toastify({
      text: text,
      duration: duration,
      newWindow: true,
      close: true,
      gravity: "top",
      position: position,
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: color,
      },
      onClick: function(){} // Callback after click
    }).showToast();
  }




}
