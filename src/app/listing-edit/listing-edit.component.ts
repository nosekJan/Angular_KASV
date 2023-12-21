import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../../modules/material.module";
import {ActivatedRoute, ParamMap, Router, RouterLink} from "@angular/router";
import {Listing} from "../../entities/listing";
import {ContactInfo} from "../../entities/contact-info";
import {CATEGORIES, ListingService} from "../../services/listing.service";
import {UserService} from "../../services/user.service";
import {flush} from "@angular/core/testing";

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

  created = false;

  id = '';
  contactInfo: ContactInfo = new ContactInfo('', '', '', '', '', '');
  image: File | null = null;

  categories = CATEGORIES;
  catSelBoolArr = this.genCategorySelectBools();

  fb: FormBuilder = inject(FormBuilder);

  yourForm = this.fb.group({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  genSelectedCategories() {
    let categories = [];
    for (let category of this.categories) {
      if (this.catSelBoolArr[this.categories.indexOf(category)])
        categories.push(category);
    }
    return categories;
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.image = fileList[0];
    }
  }

  genCategorySelectBools() {
    let selectedArray: boolean[] = [];
    for (let i of this.categories) {
      selectedArray.push(false);
    }
    return selectedArray;
  }

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.contactInfo = user.contactInfo;
    })
  }

  checkFormValidity(listing: Listing, image: File): boolean {
    return (
      !image ||
      listing.categories.length < 1 ||
      image.type !== "png" ||
      !/^[\w\s\d\S]{1,100}$/.test(listing.title) ||
      !/^[\w\s\d\S]{1,500}$/.test(listing.description) ||
      !/\d+(\.\d{1,2})?$/.test(listing.price.toString()) ||
      !/^[\p{L}\p{M}\s.'-]{1,40}$/u.test(listing.contactInfo.firstName) ||
      !/^[\p{L}\p{M}\s.'-]{1,40}$/u.test(listing.contactInfo.lastName) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(listing.contactInfo.email) ||
      !/^[+]?[0-9]{0,14}$/.test(listing.contactInfo.phoneNumber) ||
      !/^[\s\S]{0,100}$/u.test(listing.contactInfo.address) ||
      !/^[0-9]{5}$/u.test(listing.contactInfo.postalCode)
    );
  }

  onSubmit() {
    const categories: string[] = [];
    let listing = new Listing(
      this.userService.username,
      this.yourForm.get("title")?.value || '',
      this.yourForm.get("decription")?.value || '',
      Number.parseFloat(this.yourForm.get("price")?.value || '',),
      this.genSelectedCategories(),
      '',
      this.contactInfo);
    if (this.image && this.checkFormValidity(listing, this.image)) {
      const action: string = this.paramMap.get('action') || 'post';
      this.listingService.saveListing(listing, action).subscribe(imageId => {
        this.listingService.saveImage(this.image, imageId).subscribe( success => {
          this.created = success;
        })
      })
    }

  }
}
