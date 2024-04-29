import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-waste-form',
  templateUrl: './waste-form.page.html',
  styleUrls: ['./waste-form.page.scss'],
})
export class WasteFormPage implements OnInit {

  data: any;
  dataId: string;

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
  user = {} as User;
  formTitle: string = 'Crear Registro';

  constructor(
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private firebaseService: AuthenticationService,
    private utilService: UtilsService,
  ) {

    this.activatedRoute.params.subscribe(params => {

      console.log("")
      console.log("============================")
      console.log("Ya estoy en wasteForm")
      console.log("Y esta es la Data que puedo observar en details: ")
      console.log("Params: ", params)

      const dataId = params['id']; // Extraer el ID directamente
      if (dataId) {
        this.loadData(dataId);
        console.log("Desde waste-Form: ", dataId)
      } else {
        console.error('ID de residuo indefinido: No se pueden cargar los detalles del residuo.');
      }
    });

  }

  ngOnInit() {
    this.user = this.utilService.getFromLocalStorage('user');
    this.detectarDispositivo();

    this.route.params.subscribe(async params => {
      const dataId = params['id'];
      if (dataId) {
        this.loadData(dataId);
      } else {
        this.initializeForm();
      }
    });
  }

  initializeForm() {
    this.form.reset();
    const currentDate = new Date().toISOString();
    this.form.get('fecha').setValue(currentDate);
    this.formTitle = 'Crear Registro';
  }

  async loadData(id: string) {
    this.dataId = id;
    this.data = await this.firebaseService.getWasteDetailsById(id);

    // Llenar el formulario con los datos obtenidos
    this.form.patchValue({
      id: this.data.id,
      fecha: this.data.fecha,
      residuosOrdinariosNoAprovechables: this.data.residuosOrdinariosNoAprovechables,
      porcentajeResiduosOrdinariosNoAprovechables: this.data.porcentajeResiduosOrdinariosNoAprovechables,
      residuosOrdinariosAprovechables: this.data.residuosOrdinariosAprovechables,
      porcentajeResiduosOrdinariosAprovechables: this.data.porcentajeResiduosOrdinariosAprovechables,
      totalResiduosOrdinarios: this.data.totalResiduosOrdinarios,
      porcentajeTotalResiduosOrdinarios: this.data.porcentajeTotalResiduosOrdinarios,
      residuosReciclables: this.data.residuosReciclables,
      porcentajeResiduosReciclables: this.data.porcentajeResiduosReciclables,
      residuosBiosanitarios: this.data.residuosBiosanitarios,
      porcentajeResiduosBiosanitarios: this.data.porcentajeResiduosBiosanitarios,
      residuosAnatomopatologicos: this.data.residuosAnatomopatologicos,
      porcentajeResiduosAnatomopatologicos: this.data.porcentajeResiduosAnatomopatologicos,
      residuosCortopunzantes: this.data.residuosCortopunzantes,
      porcentajeResiduosCortopunzantes: this.data.porcentajeResiduosCortopunzantes,
      residuosQuimicos: this.data.residuosQuimicos,
      porcentajeResiduosQuimicos: this.data.porcentajeResiduosQuimicos,
      totalResiduosPeligrosos: this.data.totalResiduosPeligrosos,
      porcentajeResiduosPeligrosos: this.data.porcentajeResiduosPeligrosos,
      totalResiduos: this.data.totalResiduos,
      image: this.data.image
    });
    this.formTitle = 'Editar Registro';
  }

  async takeImage(){
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      quality: 100
    });
    const dataUrl = `data:image/jpeg;base64,${photo.base64String}`;
    this.form.controls.image.setValue(dataUrl);
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
    try {
      const result = await this.utilService.showConfirmation('Guardar registro', '¿Estás seguro de que deseas guardar este registro?', 'warning');

      if (result.isConfirmed){
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

            this.utilService.showToast("Registro exitoso", "center", 3000, "linear-gradient(to right, #00b09b, #96c93d)");

          }).catch(error => {
            console.log(error)
            this.utilService.showToast("No se pudo guardar el registro", "center", 3000, "linear-gradient(to right, #00b09b, #9c93d)");

          }).finally(() => {
            loading.dismiss();
            this.utilService.routerLink('/waste');
          });

        }

      }

    } catch (error) {

    }

  }


  async editData() {
    try {
      const result = await this.utilService.showConfirmation('Editar registro', '¿Estás seguro de que deseas editar este registro?', 'warning');

      if (result.isConfirmed){
        if (this.form.valid) {
          const loading = await this.utilService.loading();
          await loading.present();

          const dataUrl = this.form.value.image;
          console.log("dataUrl: ", dataUrl)

          let imagePath = this.data.image; // Obtener la ruta de la imagen actual del registro
          console.log("imagePath: ", imagePath)


          let imageUrl = null;

          // Verificar si se ha seleccionado una nueva imagen
          if (dataUrl !== imagePath) {
              // Eliminar la imagen anterior del Storage
              await this.firebaseService.deleteImage(imagePath);

              // Subir la nueva imagen al Storage
              imagePath = `${this.user.uid}/${Date.now()}`;
              imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
          }

          // Actualizar los datos del formulario con la nueva ruta de la imagen
          this.form.controls.image.setValue(imageUrl || imagePath);

          // Obtener el ID del registro
          const dataId = this.dataId;
          console.log("dataId: ", dataId)

          // Eliminar el ID del objeto de datos para evitar problemas al actualizar
          delete this.form.value.id;

          // Actualizar el registro en Firestore
          const path = `users/${this.user.uid}/wastes/${dataId}`;
          await this.firebaseService.updateDocument(path, this.form.value);

          // Mostrar un mensaje de éxito y redirigir a la página de listado de residuos
          this.utilService.showToast("Registro editado exitosamente", "center", 3000, "linear-gradient(to right, #00b09b, #96c93d)")

          loading.dismiss();
          this.utilService.routerLink('/waste');
        }
      }

    } catch (error) {

    }
  }

  async goBackWaste() {
    this.form.reset();
    this.utilService.routerLink('/waste');
  }

}
