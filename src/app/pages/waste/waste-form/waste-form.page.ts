import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { WasteDataService } from 'src/app/services/waste-data.service';

@Component({
  selector: 'app-waste-form',
  templateUrl: './waste-form.page.html',
  styleUrls: ['./waste-form.page.scss'],
})
export class WasteFormPage implements OnInit {
  fecha: string;
  residuosOrdinariosNoAprovechables: number;
  porcentajeResiduosOrdinariosNoAprovechables: number;
  residuosOrdinariosAprovechables: number;
  porcentajeResiduosOrdinariosAprovechables: number;
  totalResiduosOrdinarios: number;
  porcentajeTotalResiduosOrdinarios: number;
  residuosReciclables: number;
  porcentajeResiduosReciclables: number;
  residuosBiosanitarios: number;
  porcentajeResiduosBiosanitarios: number;
  residuosAnatomopatologicos: number;
  porcentajeResiduosAnatomopatologicos: number;
  residuosCortopunzantes: number;
  porcentajeResiduosCortopunzantes: number;
  residuosQuimicos: number;
  porcentajeResiduosQuimicos: number;
  totalResiduosPeligrosos: number;
  porcentajeResiduosPeligrosos: number;
  totalResiduos: number;
  fotoCapturada: string;
  isMobile: boolean;

  constructor(
    private router: Router,
    private wasteDataService: WasteDataService
  ) { }

  ngOnInit() {
    this.calcularPorcentajes();
    this.detectarDispositivo();
  }

  detectarDispositivo() {
    // Comprobar si el dispositivo es móvil
    const userAgent = navigator.userAgent.toLowerCase();
    this.isMobile = userAgent.includes('mobile');
  }

  calcularPorcentajes() {
    this.totalResiduosOrdinarios = this.residuosOrdinariosNoAprovechables + this.residuosOrdinariosAprovechables;
    this.totalResiduosPeligrosos = this.residuosBiosanitarios + this.residuosAnatomopatologicos + this.residuosCortopunzantes + this.residuosQuimicos;
    const totalResiduos = this.totalResiduosOrdinarios + this.residuosReciclables + this.totalResiduosPeligrosos;

    if (totalResiduos !== 0) {
      this.porcentajeResiduosOrdinariosNoAprovechables = Number(((this.residuosOrdinariosNoAprovechables / totalResiduos) * 100).toFixed(2));
      this.porcentajeResiduosOrdinariosAprovechables = Number(((this.residuosOrdinariosAprovechables / totalResiduos) * 100).toFixed(2));
      this.porcentajeTotalResiduosOrdinarios = Number(((this.totalResiduosOrdinarios / totalResiduos) * 100).toFixed(2));
      this.porcentajeResiduosReciclables = Number(((this.residuosReciclables / totalResiduos) * 100).toFixed(2));
      this.porcentajeResiduosBiosanitarios = Number(((this.residuosBiosanitarios / totalResiduos) * 100).toFixed(2));
      this.porcentajeResiduosAnatomopatologicos = Number(((this.residuosAnatomopatologicos / totalResiduos) * 100).toFixed(2));
      this.porcentajeResiduosCortopunzantes = Number(((this.residuosCortopunzantes / totalResiduos) * 100).toFixed(2));
      this.porcentajeResiduosQuimicos = Number(((this.residuosQuimicos / totalResiduos) * 100).toFixed(2));
      this.porcentajeResiduosPeligrosos = Number(((this.totalResiduosPeligrosos / totalResiduos) * 100).toFixed(2));
      this.totalResiduos = totalResiduos;
    }
  }

  async tomarFoto() {
    const foto = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    this.fotoCapturada = 'data:image/jpeg;base64,' + foto.base64String;
  }

  guardarDatos() {
    const datos = {
      fecha: this.fecha,
      residuosOrdinariosNoAprovechables: this.residuosOrdinariosNoAprovechables,
      porcentajeResiduosOrdinariosNoAprovechables: this.porcentajeResiduosOrdinariosNoAprovechables,
      residuosOrdinariosAprovechables: this.residuosOrdinariosAprovechables,
      porcentajeResiduosOrdinariosAprovechables: this.porcentajeResiduosOrdinariosAprovechables,
      residuosReciclables: this.residuosReciclables,
      porcentajeResiduosReciclables: this.porcentajeResiduosReciclables,
      residuosBiosanitarios: this.residuosBiosanitarios,
      porcentajeResiduosBiosanitarios: this.porcentajeResiduosBiosanitarios,
      residuosAnatomopatologicos: this.residuosAnatomopatologicos,
      porcentajeResiduosAnatomopatologicos: this.porcentajeResiduosAnatomopatologicos,
      residuosCortopunzantes: this.residuosCortopunzantes,
      porcentajeResiduosCortopunzantes: this.porcentajeResiduosCortopunzantes,
      residuosQuimicos: this.residuosQuimicos,
      porcentajeResiduosQuimicos: this.porcentajeResiduosQuimicos,
      totalResiduosPeligrosos: this.totalResiduosPeligrosos,
      porcentajeResiduosPeligrosos: this.porcentajeResiduosPeligrosos,
      totalResiduos: this.totalResiduos,
      fotoCapturada: this.fotoCapturada
    };

    this.wasteDataService.addWasteData(datos);

    // Enviar datos a waste.page para visualización
    // this.router.navigate(['/waste'], { state: datos });

    this.router.navigate(['/waste']);
  }

  async goBackWaste() {
    this.router.navigate(['/waste']);
  }
}
