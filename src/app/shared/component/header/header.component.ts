import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  isMenuOpen: boolean = false; // Variable para controlar la visibilidad del menú

  constructor(private firebaseService: AuthenticationService) {}

  ngOnInit() {}

  async logout() {
    this.firebaseService.signOut();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alternar la visibilidad del menú al hacer clic en el botón de hamburguesa
    console.log("toggle on")
  }
}
