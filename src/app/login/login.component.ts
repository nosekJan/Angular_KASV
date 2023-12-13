import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../../modules/material.module";
import {FormsModule} from "@angular/forms";
import {Auth} from "../../entities/auth";
import {UserService} from "../../services/user.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  hide = true;
  auth = new Auth('', '');
  usersService = inject(UserService);
  router = inject(Router);

  onSubmit() {
    this.usersService.login(this.auth).subscribe(success => {
      this.router.navigateByUrl("/");
    })
  }
}
