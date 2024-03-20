import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { WasteRegister } from 'src/app/models/wasteResgister.model';

@Component({
  selector: 'app-waste-details',
  templateUrl: 'waste-details.page.html',
  styleUrls: ['waste-details.page.scss'],
})
export class WasteDetailsPage {
  data: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private firebaseService: AuthenticationService) {
    this.activatedRoute.params.subscribe(params => {
      if (params && params['date']) {
        const date = params['date'];
        this.loadData(date);
        console.log("Desde details: ", date)
      }
    });
  }

  async loadData(date: string) {
    this.data = await this.firebaseService.getWasteDetailsByDate(date);
  }

  async goToEdit() {
    if (this.data) {
      this.firebaseService.setWasteData(this.data); // Almacena los datos en el servicio
      this.router.navigate(['/waste-form']); // Navega a la ruta waste-form
    }
  }

  async goBackWaste(){
    this.router.navigate(['/waste']);
  }

  formatDate(date: any): string {
    const formattedDate = new Date(date).toLocaleDateString('es-ES');
    return formattedDate;
  }


}
