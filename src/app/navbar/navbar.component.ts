import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {featherHome, featherLogIn, featherPlusCircle, featherUser} from '@ng-icons/feather-icons';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIcon],
  viewProviders: [provideIcons({featherHome, featherPlusCircle, featherUser, featherLogIn})],
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
