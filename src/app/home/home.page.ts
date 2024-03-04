import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {



  user:any

  constructor(
    public route: Router,
    public authService: AuthenticationService,
  ) {
    this.user = authService.getProfile();
  }

  async logout(){
    this.authService.signOut().then(() => {
      this.route.navigate(['/landing'])
    }).catch((error) => {
      console.log(error);
    })
  }

  async goToRh1(){
    this.route.navigate(['/waste']);
  }

}
