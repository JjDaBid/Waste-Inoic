import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WasteDataService } from 'src/app/services/waste-data.service';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.page.html',
  styleUrls: ['./waste.page.scss'],
})
export class WastePage implements OnInit {
  wasteData: any[];

  constructor(private router: Router, private wasteDataService: WasteDataService) { }

  ngOnInit() {
    this.wasteData = this.wasteDataService.getWasteData();
  }

  async goBackHome(){
    this.router.navigate(['/home']);
  }

  async goToWasteForm(){
    this.router.navigate(['/waste-form']);
  }

  async viewDetails(data: any) {
    console.log("data: ", data)
    console.log("data.fecha: ", data.fecha)
    // Verificar si data y data.fecha están definidos antes de navegar
    if (data) {
      // Navegar solo si ambos están definidos
      this.router.navigate(['/waste-details', data]);
    } else {
      console.error('Fecha indefinida: No se puede navegar a la página de detalles');
    }
  }
}
