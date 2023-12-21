import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../../modules/material.module";
import {ActivatedRoute, ParamMap, Router, RouterLink} from "@angular/router";
import {Listing} from "../../entities/listing";
import {ContactInfo} from "../../entities/contact-info";
import {CATEGORIES, ListingService} from "../../services/listing.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-listing-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './listing-edit.component.html',
  styleUrl: './listing-edit.component.css'
})
export class ListingEditComponent implements OnInit{

  listingService = inject(ListingService);
  userService = inject(UserService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  paramMap: ParamMap = this.route.snapshot.paramMap;

  yourForm: FormGroup;

  id: string = '';
  title: string = '';
  description: string = '';
  price: string = '';
  contactInfo: ContactInfo = new ContactInfo('', '', '', '', '', '');

  categories = CATEGORIES;
  catSelBoolArr = this.genCategorySelectBools();

  file_store: FileList | null = null;

  constructor(private fb: FormBuilder) {
    this.yourForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  genSelectedCategories() {
    let categories = [];
    for (let category of this.categories) {
      if (this.catSelBoolArr[this.categories.indexOf(category)])
        categories.push(category);
    }
    return categories;
  }

  genCategorySelectBools() {
    let selectedArray: boolean[] = [];
    for (let i of this.categories) {
      selectedArray.push(false);
    }
    return selectedArray;
  }

  ngOnInit() {
  }

  validatePriceFormat() {
    const priceRegex = /^\d+(\.\d{1,2})?$/; // Regular expression for a number with maximum two decimal places
    return priceRegex.test(this.price || '');
  }

  handleFileInputChange(event: any): void {
    const files: FileList | null = event.target.files;

    this.file_store = files;

    if (files != null) {
      if (files.length) {
        const file = files[0];
        const count = files.length > 1 ? `(+${files.length - 1} files)` : "";
        this.yourForm.controls['image'].patchValue(`${file.name} ${count}`);
      } else {
        this.yourForm.controls['image'].patchValue('');
      }
    }
  }
  onSubmit() {
    const categories: string[] = [];
    let listing = new Listing(
      this.userService.username,
      this.title,
      this.description,
      Number.parseFloat(this.price),
      this.genSelectedCategories(),
      '',
      this.contactInfo);
    const action: string = this.paramMap.get('action') || 'post';
    console.log(listing);
    this.listingService.saveListing(listing, this.file_store, action).subscribe(success => {
      console.log(success ? "successful" : "failed")});
  }
}
