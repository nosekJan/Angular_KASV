import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgIcon, provideIcons} from "@ng-icons/core";
import {featherHome, featherLogIn, featherLogOut, featherPlusCircle, featherUser} from '@ng-icons/feather-icons';
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIcon, RouterLink],
  viewProviders: [provideIcons({featherHome, featherPlusCircle, featherUser, featherLogIn, featherLogOut})],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  userService: UserService = inject(UserService);

  isLogged(): boolean {
    return this.userService.isLogged();
  }

  logout() {
    this.userService.logout();
  }

  toggleSidenav() {
    // You can add logic here to toggle the sidenav
  }

  navigateTo(route: string) {
    // You can add logic here to navigate to a specific route
  }
}
