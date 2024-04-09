import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { WasteRegister } from 'src/app/models/wasteResgister.model';
import { WasteDataService } from 'src/app/services/waste-data.service';

@Component({
  selector: 'app-waste-details',
  templateUrl: 'waste-details.page.html',
  styleUrls: ['waste-details.page.scss'],
})
export class WasteDetailsPage {
  data: any;
  dataId: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private firebaseService: AuthenticationService,
              private wasteDataService: WasteDataService
              ) {
    this.activatedRoute.params.subscribe(params => {

      console.log("")
      console.log("============================")
      console.log("Ya estoy en details")
      console.log("Y esta es la Data que puedo observar en details: ")
      console.log("Params: ", params)

      const dataId = params['id']; // Extraer el ID directamente
      if (dataId) {
        this.loadData(dataId);
        console.log("Desde details: ", dataId)
      } else {
        console.error('ID de residuo indefinido: No se pueden cargar los detalles del residuo.');
      }
    });
  }

  async loadData(id: string) {
    this.dataId = id;
    this.data = await this.firebaseService.getWasteDetailsById(id);
  }

  async goToEdit() {
    console.log("")
    console.log("=====================")
    console.log("goToEdit")
    console.log(this.dataId)
    if (this.dataId) {
      this.router.navigate(['/waste-form', this.dataId]);
    } else {
      console.error('ID de residuo indefinido: No se puede navegar a la página de edición');
    }
  }

  async goBackWaste(){
    this.router.navigate(['/waste']);
  }

  formatDate(date: any): string {
    const formattedDate = new Date(date).toLocaleDateString('es-ES');
    return formattedDate;
  }

  async deleteWaste() {
    console.log("Desde la función delete:");
    console.log("Data:", this.data);
    console.log("ID del residuo:", this.dataId); // Mostrar el ID del residuo para verificar

    if (this.dataId) {
      try {
        await this.firebaseService.deleteWaste(this.dataId); // Utilizar el ID del residuo
        console.log('Residuo eliminado correctamente');

        await this.eliminarImagen();

        // Redirige a la página de lista de residuos u otra página apropiada
        this.router.navigate(['/waste']);
      } catch (error) {
        console.error('Error al eliminar el residuo:', error);
      }
    } else {
      console.error('ID de residuo indefinido: No se puede eliminar el residuo.');
    }
  }

  async eliminarImagen(){
    await this.firebaseService.deleteImage(this.data.image);
  }

}
