import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  firebaseService = inject(AuthenticationService);
  utilsService = inject(UtilsService);

  user:any

  constructor(
    public route: Router,
    public authService: AuthenticationService,
  ) {
    this.user = authService.getProfile();
  }

  async logout(){
    this.firebaseService.signOut();
  }

  async goToRh1(){
    this.route.navigate(['/waste']);
  }

}
