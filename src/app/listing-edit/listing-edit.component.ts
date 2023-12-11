import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../../modules/material.module";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-listing-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, RouterLink],
  templateUrl: './listing-edit.component.html',
  styleUrl: './listing-edit.component.css'
})
export class ListingEditComponent {

  onSubmit() {

  }
}
