import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {MaterialModule} from "../../modules/material.module";
import {User} from "../../entities/user";
import {ContactInfo} from "../../entities/contact-info";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide = true;
  userService: UserService = inject(UserService);
  router = inject(Router);
  repeatPassword: string = '';

  user: User = new User(
    '',
    '',
    new ContactInfo('', '', '', '', '', ''));

  passwordsMatch(): boolean {
    console.log(this.user.password === this.repeatPassword)
    return this.user.password === this.repeatPassword;
  }

  onSubmit() {
    this.userService.registerUser(this.user).subscribe(success => {
      this.router.navigateByUrl("/");
    })
  }
}
