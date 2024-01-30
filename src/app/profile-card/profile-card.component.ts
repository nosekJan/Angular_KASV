import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CATEGORIES, ListingService} from "../../services/listing.service";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GameCardComponent} from "../game-card/game-card.component";
import {Listing} from "../../entities/listing";
import {UserService} from "../../services/user.service";
import {ContactInfo} from "../../entities/contact-info";
import {User} from "../../entities/user";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, FormsModule, GameCardComponent, ReactiveFormsModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent implements OnInit{
  ngOnInit(): void {
    this.loadListings();
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.userService.loadContactInfo(user.contactInfo, this.form);
    });
  }

  listingService: ListingService = inject(ListingService);
  userService: UserService = inject(UserService);
  listings: Listing[] = [];
  user!: User;

  showError = false;

  fb: FormBuilder = inject(FormBuilder);

  form = this.fb.group({
    firstName: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,40}$/)]),
    lastName: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{1,40}$/)]),
    email: new FormControl('',[Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    phoneNumber: new FormControl('',[Validators.required, Validators.pattern(/^[+]?[0-9]{0,14}$/)]),
    address: new FormControl('',[Validators.required, Validators.pattern(/^[\s\S]{0,100}$/u)]),
    postalCode: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{5}$/u)]),
  });

  loadListings() {
    this.listingService.getListings("?seller=" + this.userService.username)
      .subscribe(listings => {
        this.listings = listings;
      });
  }

  onSubmit() {
    if (this.userService.checkFormValidity(this.form)) {
      const contactInfo: ContactInfo = new ContactInfo(
        this.form.get('phoneNumber')?.value || '',
        this.form.get('firstName')?.value || '',
        this.form.get('lastName')?.value || '',
        this.form.get('email')?.value || '',
        this.form.get('address')?.value || '',
        this.form.get('postalCode')?.value || ''
      );

      if (JSON.stringify(contactInfo) != JSON.stringify(this.user.contactInfo)) {
        this.user.contactInfo = contactInfo;
        this.userService.updateContactInfo(this.user)
        .subscribe(success => {
          if (success)
            location.reload();
        });
      }

      this.showError = false;
    }
    else {
      this.showError = true;
    }
  }

}


