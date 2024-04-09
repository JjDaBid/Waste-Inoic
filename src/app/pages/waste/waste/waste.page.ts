import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/models/user.model';
import { WasteRegister } from 'src/app/models/wasteResgister.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.page.html',
  styleUrls: ['./waste.page.scss'],
})
export class WastePage implements OnInit {

  wasteData: WasteRegister[] = [];

  constructor(private router: Router,
              private firebaseService: AuthenticationService,
              private utilService: UtilsService) { }

  ngOnInit() {
    this.getRegisters();
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

  async viewDetails(data: any) {
    console.log("");
    console.log("================================");
    console.log("viewDetails()");
    console.log("ID: ", data.id);
    console.log("Esta es la informacion que hay: ");
    console.log("Data: ", data);
    if (data && data.id) {
      this.router.navigate(['/waste-details', data.id]);
      console.log("Si entro al IF")
    } else {
      console.error('Fecha indefinida: No se puede navegar a la página de detalles');
    }
  }

  formatDate(date: any): string {
    const formattedDate = new Date(date).toLocaleDateString('es-ES');
    return formattedDate;
  }
}

