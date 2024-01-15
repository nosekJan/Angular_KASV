import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MaterialModule} from "../../modules/material.module";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
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

  constructor() {
    //window.onbeforeunload = (event) => event.preventDefault();
  }

  listingService = inject(ListingService);
  userService = inject(UserService);
  location = inject(Location);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  showError = false;

  id = this.route.snapshot.paramMap.get('id');
  listing: Listing | null = null;

  created = false;

  image: File | null = null;
  imageTooLarge = false;

  categories = CATEGORIES;
  selectedCategories: string[] = [];
  categorySelected = true;

  fb: FormBuilder = inject(FormBuilder);

  form = this.fb.group({
    title: new FormControl('', [Validators.required, Validators.pattern(/^[\w\s\d\S]{1,100}$/)]),
    description: new FormControl('', [Validators.required, Validators.pattern(/^[\w\s\d\S]{1,500}$/)]),
    price: new FormControl('', [Validators.required, Validators.pattern(/\d+(\.\d{1,2})?$/)]),
    image: new FormControl('', Validators.required),
    firstName: new FormControl('',[Validators.required, Validators.pattern(/^[\p{L}\p{M}\s.'-]{1,40}$/u)]),
    lastName: new FormControl('',[Validators.required, Validators.pattern(/^[\p{L}\p{M}\s.'-]{1,40}$/u)]),
    email: new FormControl('',[Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    phoneNumber: new FormControl('',[Validators.required, Validators.pattern(/^[+]?[0-9]{0,14}$/)]),
    address: new FormControl('',[Validators.required, Validators.pattern(/^[\s\S]{0,100}$/u)]),
    postalCode: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{5}$/u)]),
  });

  selectCategory(category: string) {
    if (this.selectedCategories.includes(category))
      this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1);
    else
      this.selectedCategories.push(category);
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.image = fileList[0];
      this.imageTooLarge = this.image.size > 5000000;
    }
  }

  ngOnInit() {
    if (this.id != null) {
      this.listingService.getListing(this.id).subscribe(listing => {
        this.listing = listing;

        this.form.get('title')?.setValue(listing.title);
        this.form.get('description')?.setValue(listing.description);
        this.form.get('price')?.setValue(listing.price.toString());
        this.loadContactInfo(listing.contactInfo);

        this.selectedCategories = listing.categories;
        listing.categories.forEach(category => {
          category = category.replace(' ','');
          const checkbox =document.querySelector('#' + category) as HTMLInputElement;
          if (checkbox)
            checkbox.checked = true
        })
      })
    }
    else {
      this.userService.getUser().subscribe(user => {
        this.loadContactInfo(user.contactInfo);
      })
    }
  }

  loadContactInfo(contactInfo: ContactInfo) {
    this.form.get('firstName')?.setValue(contactInfo.firstName);
    this.form.get('lastName')?.setValue(contactInfo.lastName);
    this.form.get('email')?.setValue(contactInfo.email);
    this.form.get('phoneNumber')?.setValue(contactInfo.phoneNumber);
    this.form.get('address')?.setValue(contactInfo.address);
    this.form.get('postalCode')?.setValue(contactInfo.postalCode);
  }

  checkImageValidity() {
    const image = this.image;

    if (image && image.type == 'image/png' && image && image.size <= 5000000)
      return true;
    else if (this.listing && image == null)
      return true;
    else
      return false;
  }

  onSubmit() {

    let listing = new Listing(
      this.userService.username,
      this.form.get("title")?.value || '',
      this.form.get("description")?.value || '',
      Number.parseFloat(this.form.get("price")?.value || '0'),
      this.selectedCategories,
      '',
      new ContactInfo(
        this.form.get("phoneNumber")?.value || '',
        this.form.get("firstName")?.value || '',
        this.form.get("lastName")?.value || '',
        this.form.get("email")?.value || '',
        this.form.get("address")?.value || '',
        this.form.get("postalCode")?.value || '',
      ));

    if (this.listing) {
      listing.id = this.listing.id;
      listing.imageId = this.listing.imageId;
    }

    if (listing.categories.length < 0)
      this.categorySelected = false;

    if (this.checkImageValidity() && listing.categories.length > 0 && this.userService.checkFormValidity(this.form)) {
      const action = this.listing ? 'update' : 'post';

      if (this.listing) {
        this.listingService.saveListing(listing, action).subscribe(() => {
          if (this.image && this.listing)
            this.listingService.saveImage(this.image, this.listing.imageId).subscribe(success => {
              this.created = success;
            })
          else
            this.created = true;
        })
      }
      else {
        this.listingService.saveListing(listing, action).subscribe(imageId => {
          this.listingService.saveImage(this.image, imageId).subscribe( success => {
            this.created = success;
          })
        })
      }
    }
    else
      this.showError = true;
  }
}
