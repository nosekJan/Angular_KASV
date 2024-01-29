import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CATEGORIES, ListingService} from "../../services/listing.service";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {GameCardComponent} from "../game-card/game-card.component";
import {Listing} from "../../entities/listing";
import {UserService} from "../../services/user.service";

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
  }

  protected readonly CATEGORIES = CATEGORIES;
  listingService: ListingService = inject(ListingService);
  userService: UserService = inject(UserService);
  listings: Listing[] = [];

  fb: FormBuilder = inject(FormBuilder);

  contactInfoForm = this.fb.group({
    firstName: new FormControl('',[Validators.required, Validators.pattern(/^[\p{L}\p{M}\s.'-]{1,40}$/u)]),
    lastName: new FormControl('',[Validators.required, Validators.pattern(/^[\p{L}\p{M}\s.'-]{1,40}$/u)]),
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

  }

}


