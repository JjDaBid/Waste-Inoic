import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WasteDataService } from 'src/app/services/waste-data.service';

@Component({
  selector: 'app-waste-details',
  templateUrl: 'waste-details.page.html',
  styleUrls: ['waste-details.page.scss'],
})
export class WasteDetailsPage {
  data: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private wasteDataService: WasteDataService) {
    this.activatedRoute.params.subscribe(params => {
      if (params && params['date']) {
        const date = params['date'];
        this.loadData(date);
      }
    });
  }

  async goBackWaste(){
    this.router.navigate(['/waste']);
  }

  loadData(date: string) {
    // Utiliza el servicio WasteDataService para obtener los detalles de los residuos utilizando la fecha proporcionada
    this.data = this.wasteDataService.getWasteDetailsByDate(date);
  }
}
