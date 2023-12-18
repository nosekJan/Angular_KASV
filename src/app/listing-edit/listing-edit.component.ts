import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../../modules/material.module";
import {RouterLink} from "@angular/router";
import {Listing} from "../../entities/listing";
import {ContactInfo} from "../../entities/contact-info";
import {UserService} from "../../services/user.service";
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-listing-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './listing-edit.component.html',
  styleUrl: './listing-edit.component.css'
})
export class ListingEditComponent {

  listingService = inject(ListingService);

  id: string = '';
  title: string = '';
  description: string = '';
  price: string = '';
  contactInfo: ContactInfo = new ContactInfo('', '', '', '', '', '');

  file_store: FileList | null = null;
  imageFormControl= new FormControl('', Validators.required);

  validatePriceFormat() {
    const priceRegex = /^\d+(\.\d{1,2})?$/; // Regular expression for a number with maximum two decimal places
    return priceRegex.test(this.price || '');
  }

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
    const categories: string[] = [];
    let listing = new Listing('', this.title, this.description, Number.parseFloat(this.price), categories,'', this.contactInfo);
    const action: string = this.id == '' ? "post" : "edit";
    console.log(listing);
    this.listingService.saveListing(listing, this.file_store, action).subscribe(success => {
      console.log(success ? "successful" : "failed")});
  }
}
