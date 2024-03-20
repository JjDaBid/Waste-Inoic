import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { WasteDataService } from 'src/app/services/waste-data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-waste-form',
  templateUrl: './waste-form.page.html',
  styleUrls: ['./waste-form.page.scss'],
})
export class WasteFormPage implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    fecha: new FormControl(''),
    residuosOrdinariosNoAprovechables: new FormControl('', [Validators.required, Validators.min(0)]),
    porcentajeResiduosOrdinariosNoAprovechables: new FormControl('', [Validators.required, Validators.min(0)]),
    residuosOrdinariosAprovechables: new FormControl('', [Validators.required, Validators.min(0)]),
    porcentajeResiduosOrdinariosAprovechables: new FormControl('', [Validators.required, Validators.min(0)]),
    totalResiduosOrdinarios: new FormControl('', [Validators.required, Validators.min(0)]),
    porcentajeTotalResiduosOrdinarios: new FormControl('', [Validators.required, Validators.min(0)]),
    residuosReciclables: new FormControl('', [Validators.required, Validators.min(0)]),
    porcentajeResiduosReciclables: new FormControl('', [Validators.required, Validators.min(0)]),
    residuosBiosanitarios: new FormControl('', [Validators.required, Validators.min(0)]),
    porcentajeResiduosBiosanitarios: new FormControl('', [Validators.required, Validators.min(0)]),
    residuosAnatomopatologicos: new FormControl('', [Validators.required, Validators.min(0)]),
    porcentajeResiduosAnatomopatologicos: new FormControl('', [Validators.required, Validators.min(0)]),
    residuosCortopunzantes: new FormControl('', [Validators.required, Validators.min(0)]),
    porcentajeResiduosCortopunzantes: new FormControl('', [Validators.required, Validators.min(0)]),
    residuosQuimicos: new FormControl('', [Validators.required, Validators.min(0)]),
    porcentajeResiduosQuimicos: new FormControl('', [Validators.required, Validators.min(0)]),
    totalResiduosPeligrosos: new FormControl('', [Validators.required, Validators.min(0)]),
    porcentajeResiduosPeligrosos: new FormControl('', [Validators.required, Validators.min(0)]),
    totalResiduos: new FormControl('', [Validators.required, Validators.min(0)]),
    image: new FormControl('', [Validators.required])
  })

  isMobile: boolean;

  firebaseService = inject(AuthenticationService);
  utilService = inject(UtilsService);
  user = {} as User;

  ngOnInit() {
    this.user = this.utilService.getFromLocalStorage('user')
    this.calculatePercentages();
    this.detectarDispositivo();

    const currentDate = new Date().toISOString();
    this.form.get('fecha').setValue(currentDate);
  }

  async takeImage(){
    const dataUrl = (await this.utilService.takePicture("imagen del producto")).dataUrl;
    this.form.controls.image.setValue(dataUrl)
  }

  detectarDispositivo() {
    const userAgent = navigator.userAgent.toLowerCase();
    this.isMobile = userAgent.includes('mobile');
  }

  calculatePercentages() {
    const residuosOrdinariosNoAprovechables = parseFloat(this.form.get('residuosOrdinariosNoAprovechables').value);
    const residuosOrdinariosAprovechables = parseFloat(this.form.get('residuosOrdinariosAprovechables').value);
    const residuosReciclables = parseFloat(this.form.get('residuosReciclables').value);
    const residuosBiosanitarios = parseFloat(this.form.get('residuosBiosanitarios').value);
    const residuosAnatomopatologicos = parseFloat(this.form.get('residuosAnatomopatologicos').value);
    const residuosCortopunzantes = parseFloat(this.form.get('residuosCortopunzantes').value);
    const residuosQuimicos = parseFloat(this.form.get('residuosQuimicos').value);

    const totalResiduosOrdinarios = residuosOrdinariosNoAprovechables + residuosOrdinariosAprovechables;
    const totalResiduosPeligrosos = residuosBiosanitarios + residuosAnatomopatologicos + residuosCortopunzantes + residuosQuimicos;
    const totalResiduos = totalResiduosOrdinarios + residuosReciclables + totalResiduosPeligrosos;

    if (totalResiduos !== 0) {
      this.form.get('porcentajeResiduosOrdinariosNoAprovechables').setValue(((residuosOrdinariosNoAprovechables / totalResiduos) * 100).toFixed(2).toString());
      this.form.get('porcentajeResiduosOrdinariosAprovechables').setValue(((residuosOrdinariosAprovechables / totalResiduos) * 100).toFixed(2).toString());
      this.form.get('porcentajeTotalResiduosOrdinarios').setValue(((totalResiduosOrdinarios / totalResiduos) * 100).toFixed(2).toString());
      this.form.get('porcentajeResiduosReciclables').setValue(((residuosReciclables / totalResiduos) * 100).toFixed(2).toString());
      this.form.get('porcentajeResiduosBiosanitarios').setValue(((residuosBiosanitarios / totalResiduos) * 100).toFixed(2).toString());
      this.form.get('porcentajeResiduosAnatomopatologicos').setValue(((residuosAnatomopatologicos / totalResiduos) * 100).toFixed(2).toString());
      this.form.get('porcentajeResiduosCortopunzantes').setValue(((residuosCortopunzantes / totalResiduos) * 100).toFixed(2).toString());
      this.form.get('porcentajeResiduosQuimicos').setValue(((residuosQuimicos / totalResiduos) * 100).toFixed(2).toString());
      this.form.get('porcentajeResiduosPeligrosos').setValue(((totalResiduosPeligrosos / totalResiduos) * 100).toFixed(2).toString());
      this.form.get('totalResiduosOrdinarios').setValue(totalResiduosOrdinarios.toString());
      this.form.get('totalResiduosPeligrosos').setValue(totalResiduosPeligrosos.toString());
      this.form.get('totalResiduos').setValue(totalResiduos.toString());

    } else {
      this.form.get('porcentajeResiduosOrdinariosNoAprovechables').setValue("0");
      this.form.get('porcentajeResiduosOrdinariosAprovechables').setValue("0");
      this.form.get('porcentajeTotalResiduosOrdinarios').setValue("0");
      this.form.get('porcentajeResiduosReciclables').setValue("0");
      this.form.get('porcentajeResiduosBiosanitarios').setValue("0");
      this.form.get('porcentajeResiduosAnatomopatologicos').setValue("0");
      this.form.get('porcentajeResiduosCortopunzantes').setValue("0");
      this.form.get('porcentajeResiduosQuimicos').setValue("0");
      this.form.get('porcentajeResiduosPeligrosos').setValue("0");
      this.form.get('totalResiduosOrdinarios').setValue("0");
      this.form.get('totalResiduosPeligrosos').setValue("0");
      this.form.get('totalResiduos').setValue("0");
    }
  }

  async saveData(){
    if(this.form.valid){

      let path = `users/${this.user.uid}/wastes`

      const loading = await this.utilService.loading();
      await loading.present();

      let dataUrl = this.form.value.image;
      let imagePath = `${this.user.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
      this.form.controls.image.setValue(imageUrl);

      delete this.form.value.id;

      this.firebaseService.addRegister(path, this.form.value).then(res => {

        this.utilService.presentToast({
          message: "Registro exitoso",
          duration: 1500,
          color: "success",
          position: "middle",
          icon: "checkmark-cicle-outline"
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
        this.utilService.routerLink('/waste');

      })

    }

  }

  async goBackWaste() {
    this.utilService.routerLink('/waste');
  }


}
