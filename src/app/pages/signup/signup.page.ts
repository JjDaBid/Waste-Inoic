// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoadingController } from '@ionic/angular';
// import { AuthenticationService } from 'src/app/authentication.service';

import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  regForm = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
    ]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })




  hidePassword: boolean = true;

  firebaseService = inject(AuthenticationService);
  utilService = inject(UtilsService);

  ngOnInit(){

  }

  async signup(){
    if(this.regForm.valid){
      const loading = await this.utilService.loading();
      await loading.present();
      this.firebaseService.registerUser(this.regForm.value as User).then(async res => {
        await this.firebaseService.updateUser(this.regForm.value.name);

        let uid = res.user.uid;
        this.regForm.controls.uid.setValue(uid);

        this.setUserInfo(uid);

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


  async setUserInfo(uid: string){
    if(this.regForm.valid){
      const loading = await this.utilService.loading();
      await loading.present();

      let path = 'users/${uid}';
      delete this.regForm.value.password;

      this.firebaseService.setDocument(path, this.regForm.value).then(async res => {

        this.utilService.saveInLocalStorage('user', this.regForm.value);
        this.utilService.routerLink('/home');
        this.regForm.reset();

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




  // regForm: FormGroup;

  // constructor(
  //   public formBuilder:FormBuilder,
  //   public loadingCtrl:LoadingController,
  //   public authService:AuthenticationService,
  //   public router: Router
  //   ) { }

  // ngOnInit() {
  //   this.regForm = this.formBuilder.group({
  //     fullname: ['',[Validators.required]],
  //     email: ['', [
  //       Validators.required,
  //       Validators.email,
  //       Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
  //     ]],
  //     password: ['', [
  //       Validators.required,
  //       Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
  //     ]]
  //   })
  // }

  // get errorControl(){
  //   return this.regForm?.controls;
  // }

  // async signup(){
  //   const loading = await this.loadingCtrl.create();
  //   await loading.present();
  //   if(this.regForm?.valid){
  //     const user = await this.authService.registerUser(this.regForm.value.email, this.regForm.value.password).catch((error) => {
  //       console.log(error);
  //       loading.dismiss()
  //     })

  //     if(user){
  //       loading.dismiss()
  //       this.router.navigate(['/login'])
  //     } else {
  //       console.log('Proporcione un valor correcto')
  //     }
  //   }
  // }

}
