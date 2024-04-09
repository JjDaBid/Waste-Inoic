import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/models/user.model';
import { WasteRegister } from 'src/app/models/wasteResgister.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-waste-report',
  templateUrl: './waste-report.page.html',
  styleUrls: ['./waste-report.page.scss'],
})
export class WasteReportPage implements OnInit {

  fechaInicial: string;
  fechaFinal: string;
  wasteData: WasteRegister[] = [];
  totalResiduosOrdinariosNoAprovechables: number = 0;
  totalResiduosOrdinariosAprovechables: number = 0;
  totalResiduosReciclables: number = 0;
  totalResiduosBiosanitarios: number = 0;
  totalResiduosAnatomopatologicos: number = 0;
  totalResiduosCortopunzantes: number = 0;
  totalResiduosQuimicos: number = 0;
  totalResiduos: number = 0;

  constructor(
    private router: Router,
    private firebaseService: AuthenticationService,
    private utilService: UtilsService) { }


  ngOnInit() {
    this.getRegisters();
  }

  selectDates(fechaInicial: Date, fechaFinal: Date): { fechaInicial: Date, fechaFinal: Date } {
    return { fechaInicial, fechaFinal };
  }

  async goBackHome(){
    this.router.navigate(['/home']);
  }

  async goToWasteForm(){
    this.router.navigate(['/waste-form']);
  }

  async goToReport(){
    this.router.navigate(['/waste-report']);
  }

  user(): User{
    return this.utilService.getFromLocalStorage('user');
  }

  ionViewWillEnter(){
    this.getRegisters();
  }

  getRegisters(){
    const path = `users/${this.user().uid}/wastes`;

    const sub = this.firebaseService.getCollectionData(path).subscribe({
      next: (res: any) => {
        this.wasteData = res;
        sub.unsubscribe();
      }
    });
  }


  formatDate(date: any): string {
    const formattedDate = new Date(date).toLocaleDateString('es-ES');
    return formattedDate;
  }

  filterData() {
    // Convertir las fechas iniciales y finales a objetos de tipo Date
    const fechaInicial = new Date(this.fechaInicial + 'T00:00:00'); // Añadir la hora a las fechas
    const fechaFinal = new Date(this.fechaFinal + 'T23:59:59'); // Añadir la hora a las fechas

    // Inicializar las variables de totales
    this.totalResiduosOrdinariosNoAprovechables = 0;
    this.totalResiduosOrdinariosAprovechables = 0;
    this.totalResiduosReciclables = 0;
    this.totalResiduosBiosanitarios = 0;
    this.totalResiduosAnatomopatologicos = 0;
    this.totalResiduosCortopunzantes = 0;
    this.totalResiduosQuimicos = 0;
    this.totalResiduos = 0;

    // Recorrer los registros y sumar los totales dentro del rango de fechas
    this.wasteData.forEach((registro: WasteRegister) => {
      // Obtener la fecha del registro
      const fechaRegistro = new Date(registro.fecha);
      // Verificar si la fecha del registro está dentro del rango seleccionado
      if (fechaRegistro >= fechaInicial && fechaRegistro <= fechaFinal) {
        // Sumar los totales
        this.totalResiduosOrdinariosNoAprovechables += parseFloat(registro.residuosOrdinariosNoAprovechables) || 0;
        this.totalResiduosOrdinariosAprovechables += parseFloat(registro.residuosOrdinariosAprovechables) || 0;
        this.totalResiduosReciclables += parseFloat(registro.residuosReciclables) || 0;
        this.totalResiduosBiosanitarios += parseFloat(registro.residuosBiosanitarios) || 0;
        this.totalResiduosAnatomopatologicos += parseFloat(registro.residuosAnatomopatologicos) || 0;
        this.totalResiduosCortopunzantes += parseFloat(registro.residuosCortopunzantes) || 0;
        this.totalResiduosQuimicos += parseFloat(registro.residuosQuimicos) || 0;
        this.totalResiduos += parseFloat(registro.totalResiduos) || 0;
      }
    });
  }
}











