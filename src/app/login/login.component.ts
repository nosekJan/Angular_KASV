import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {MaterialModule} from "../../modules/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Auth} from "../../entities/auth";
import {UserService} from "../../services/user.service";
import {Router, RouterLink} from "@angular/router";
import {CATEGORIES} from "../../services/listing.service";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [CommonModule, MaterialModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{
  hide = true;
  auth = new Auth('', '');
  usersService = inject(UserService);
  location: Location = inject(Location);

  onSubmit() {
    this.usersService.login(this.auth).subscribe(success => {
      this.location.back();
    })
  }

    protected readonly categories = CATEGORIES;
}
