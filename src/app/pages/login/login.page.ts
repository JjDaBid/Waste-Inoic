import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  hidePassword: boolean = true;

  firebaseService = inject(AuthenticationService);
  utilService = inject(UtilsService);

  ngOnInit(){

  }

  async login(){
    if(this.loginForm.valid){
      const loading = await this.utilService.loading();
      await loading.present();
      this.firebaseService.loginUser(this.loginForm.value as User).then(res => {

        this.getUserInfo(res.user.uid);

      }).catch(error => {
        console.log(error)
        this.utilService.presentToast({
          message: error.message,
          duration: 2500,
          color: "#ffffff",
          position: "middle",
          icon: "alert-cicle-outline"
        })
      }).finally(() => {
        loading.dismiss();
      })
    }

  }

  async getUserInfo(uid: string){
    if(this.loginForm.valid){
      const loading = await this.utilService.loading();
      await loading.present();

      let path = 'users/${uid}';

      this.firebaseService.getDocument(path).then((user: User) => {

        this.utilService.saveInLocalStorage('user', user);
        this.utilService.routerLink('/home');
        this.loginForm.reset();

        this.utilService.presentToast({
          message: `Bienvenido ${user.name}`,
          duration: 1500,
          color: "#ffffff",
          position: "middle",
          icon: "person-cicle-outline"
        })

      }).catch(error => {
        console.log(error)
        this.utilService.presentToast({
          message: error.message,
          duration: 2500,
          color: "#ffffff",
          position: "middle",
          icon: "alert-cicle-outline"
        })
      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  // async login() {
  //   const loading = await this.loadingController.create();
  //   await loading.present();
  //   if (this.loginForm.valid) {
  //     const user = await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).catch((error) => {
  //       this.presentToast(error)
  //       console.log(error);
  //       loading.dismiss();
  //     })

  //     if (user) {
  //       loading.dismiss();
  //       this.router.navigate(['/home'])
  //     }
  //   } else {
  //     return console.log('Please provide all the required values!');
  //   }

  // }
  // get errorControl() {
  //   return this.loginForm.controls;
  // }

  // async presentToast(message: "undefined") {
  //   console.log(message);

  //   const toast = await this.toastController.create({
  //     message: "Usuario o contraseña incorrectos",
  //     duration: 2000,
  //     position: 'top',
  //   });

  //   await toast.present();
  // }

  showOrHidePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
