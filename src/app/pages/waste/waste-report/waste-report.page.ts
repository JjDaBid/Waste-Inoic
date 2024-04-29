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

  chartData: any;
  barChartData: any;

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

  porcentajeTotalResiduosOrdinariosNoAprovechables: number = 0;
  porcentajeTotalResiduosOrdinariosAprovechables: number = 0;
  porcentajeTotalResiduosReciclables: number = 0;
  porcentajeTotalResiduosBiosanitarios: number = 0;
  porcentajeTotalResiduosAnatomopatologicos: number = 0;
  porcentajeTotalResiduosCortopunzantes: number = 0;
  porcentajeTotalResiduosQuimicos: number = 0;
  porcentajeTotalResiduos: number = 0;

  constructor(
    private router: Router,
    private firebaseService: AuthenticationService,
    private utilService: UtilsService) { }


  ngOnInit() {
    this.getRegisters();
    this.generateChartData();
    this.generateSecondChartData();

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

    this.porcentajeTotalResiduosOrdinariosNoAprovechables = 0;
    this.porcentajeTotalResiduosOrdinariosAprovechables = 0;
    this.porcentajeTotalResiduosReciclables = 0;
    this.porcentajeTotalResiduosBiosanitarios = 0;
    this.porcentajeTotalResiduosAnatomopatologicos = 0;
    this.porcentajeTotalResiduosCortopunzantes = 0;
    this.porcentajeTotalResiduosQuimicos = 0;
    this.porcentajeTotalResiduos = 0;

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

    if (this.totalResiduos > 0) {
      this.porcentajeTotalResiduosOrdinariosNoAprovechables = parseFloat((this.totalResiduosOrdinariosNoAprovechables / this.totalResiduos * 100).toFixed(2));
      this.porcentajeTotalResiduosOrdinariosAprovechables = parseFloat((this.totalResiduosOrdinariosAprovechables / this.totalResiduos * 100).toFixed(2));
      this.porcentajeTotalResiduosReciclables = parseFloat((this.totalResiduosReciclables / this.totalResiduos * 100).toFixed(2));
      this.porcentajeTotalResiduosBiosanitarios = parseFloat((this.totalResiduosBiosanitarios / this.totalResiduos * 100).toFixed(2));
      this.porcentajeTotalResiduosAnatomopatologicos = parseFloat((this.totalResiduosAnatomopatologicos / this.totalResiduos * 100).toFixed(2));
      this.porcentajeTotalResiduosCortopunzantes = parseFloat((this.totalResiduosCortopunzantes / this.totalResiduos * 100).toFixed(2));
      this.porcentajeTotalResiduosQuimicos = parseFloat((this.totalResiduosQuimicos / this.totalResiduos * 100).toFixed(2));
      this.porcentajeTotalResiduos = 100;
    }

    this.generateChartData();
    this.generateSecondChartData();
  }

  generateChartData() {
    this.chartData = {
      series: [ // Aquí debes poner los datos de tu serie
            this.totalResiduosOrdinariosNoAprovechables,
            this.totalResiduosOrdinariosAprovechables,
            this.totalResiduosReciclables,
            this.totalResiduosBiosanitarios,
            this.totalResiduosAnatomopatologicos,
            this.totalResiduosCortopunzantes,
            this.totalResiduosQuimicos,
      ],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: [
        "Ordin. No Aprov.",
        "Ordin. Aprov.",
        "Reciclables",
        "Biosanitarios",
        "Anatomopat.",
        "Cortopunzantes",
        "Químicos",
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    console.log("ChartData:", this.chartData);
  }




  generateSecondChartData() {
    this.barChartData = {
      series: [
        {
          name: "Kilogramos",
          data: [
            this.totalResiduosOrdinariosNoAprovechables,
            this.totalResiduosOrdinariosAprovechables,
            this.totalResiduosReciclables,
            this.totalResiduosBiosanitarios,
            this.totalResiduosAnatomopatologicos,
            this.totalResiduosCortopunzantes,
            this.totalResiduosQuimicos,
          ]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8"
      ],
      plotOptions: {
        bar: {
          columnWidth: "60%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: true
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          "Ordin. No Aprov.",
          "Ordin. Aprov.",
          "Reciclables",
          "Biosanitarios",
          "Anatomopat.",
          "Cortopunzantes",
          "Químicos"
        ],
        labels: {
          style: {
            colors: [
              "#008FFB",
              "#00E396",
              "#FEB019",
              "#FF4560",
              "#775DD0",
              "#546E7A",
              "#26a69a",
            ],
            fontSize: "10px"
          }
        }
      }
    };

  }

}
