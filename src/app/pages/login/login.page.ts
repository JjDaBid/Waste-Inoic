import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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
        this.utilService.showToast(
          "Las credenciales de autenticación proporcionadas son incorrectas, o han expirado.",
          "center",
          4000,
          "")
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

        this.utilService.showToast(
          `Bienvenido ${user.name}`,
          "right",
          4000,
          "linear-gradient(to right, #00b09b, #96c93d)")

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

   showOrHidePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
