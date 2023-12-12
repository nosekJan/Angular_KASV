import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../../modules/material.module";
import {RouterLink} from "@angular/router";
import {priceFormatValidator} from "../../services/input.validators";

@Component({
  selector: 'app-listing-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './listing-edit.component.html',
  styleUrl: './listing-edit.component.css'
})
export class ListingEditComponent {

  titleFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);
  imageFormControl: FormControl = new FormControl("", Validators.required);
  priceFormControl = new FormControl('', [
    Validators.required,
    priceFormatValidator // Apply the custom validator here
  ]);

  file_store: FileList | null = null;

  handleFileInputChange(l: FileList | null): void {
    this.file_store = l;
    if (l != null) {
      if (l.length) {
        const f = l[0];
        const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
        this.imageFormControl.patchValue(`${f.name}${count}`);
      } else {
        this.imageFormControl.patchValue("");
      }
    }
  }
  onSubmit() {

  }
}
