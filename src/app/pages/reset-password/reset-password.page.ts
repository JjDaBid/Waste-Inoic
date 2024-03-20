import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  firebaseService = inject(AuthenticationService);
  utilService = inject(UtilsService);

  ngOnInit(){

  }

  async resetPassword(){
    if(this.form.valid){
      const loading = await this.utilService.loading();
      await loading.present();
      this.firebaseService.resetPassword(this.form.value.email).then(res => {

        this.utilService.presentToast({
          message: "Correo enviado con exito",
          duration: 1500,
          color: "#ffffff",
          position: "middle",
          icon: "mail-outline"
        })

        this.utilService.routerLink('/login');
        this.form.reset;

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

}
