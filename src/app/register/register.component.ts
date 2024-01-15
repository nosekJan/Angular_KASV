import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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

  showError = false;
  created = false;

  fb: FormBuilder = inject(FormBuilder);

  form = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    repeatPassword: new FormControl('', Validators.required),
    firstName: new FormControl('',[Validators.pattern(/^[\p{L}\p{M}\s.'-]{1,40}$/u)]),
    lastName: new FormControl('',[Validators.pattern(/^[\p{L}\p{M}\s.'-]{1,40}$/u)]),
    email: new FormControl('',[Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    phoneNumber: new FormControl('',[Validators.pattern(/^[+]?[0-9]{0,14}$/)]),
    address: new FormControl('',[Validators.pattern(/^[\s\S]{0,100}$/u)]),
    postalCode: new FormControl('',[Validators.pattern(/^[0-9]{5}$/u)]),
  });

  passwordsMatch(): boolean {
    return this.form.get('password')?.value === this.form.get('repeatPassword')?.value;
  }

  onSubmit() {

    if (!this.userService.checkFormValidity(this.form)) {
      this.showError = true;
      return;
    }

    const user = new User(
      this.form.get('username')?.value || '',
      this.form.get('password')?.value || '',
      new ContactInfo(
        this.form.get('firstName')?.value || '',
        this.form.get('lastName')?.value || '',
        this.form.get('email')?.value || '',
        this.form.get('phoneNumber')?.value || '',
        this.form.get('address')?.value || '',
        this.form.get('postalCode')?.value || '',
      )
    )

    this.userService.registerUser(user).subscribe(success => {
      if (success)
        this.created = true;
      else
        this.showError = true;
    })
  }
}
