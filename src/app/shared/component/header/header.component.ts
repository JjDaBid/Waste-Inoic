import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

import Toastify from 'toastify-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  isMenuOpen: boolean = false; // Variable para controlar la visibilidad del menú

  constructor(
    private firebaseService: AuthenticationService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {}

  async logout() {
    try {
      const result = await this.utilsService.showConfirmation('Cerrar Sesión', '¿Estás seguro de que deseas cerrar tu sesión?', 'question');
      if(result.isConfirmed){
        await this.firebaseService.signOut();
        await this.utilsService.showToast("Sesión Cerrada", "right", 4000, "linear-gradient(to right, #ff4d4d, #b30000);");
        await this.utilsService.showToast("Te esperamos pronto", "right", 4000, "linear-gradient(to right, #00b09b, #96c93d)");
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alternar la visibilidad del menú al hacer clic en el botón de hamburguesa
    console.log("toggle on");
  }

}
