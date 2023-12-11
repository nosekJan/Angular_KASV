import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  toggleSidenav() {
    // You can add logic here to toggle the sidenav
  }

  navigateTo(route: string) {
    // You can add logic here to navigate to a specific route
  }
}
