import {asNativeElements, Component, ElementRef, inject, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {Listing} from "../../entities/listing";
import {ContactInfo} from "../../entities/contact-info";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  featherEdit,
  featherTrash2,
} from "@ng-icons/feather-icons";
import {ListingService} from "../../services/listing.service";

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, NgIcon],
  viewProviders: [provideIcons({featherEdit, featherTrash2})],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})

export class GameCardComponent{

  constructor(contactInfo: ElementRef) {
  }

  @Input() listing = new Listing('','','',0,[],'',
    new ContactInfo('','','','','',''));

  router: Router = inject(Router);
  userService = inject(UserService);
  listingService = inject(ListingService);
  id: string | undefined;

  searchBySeller(seller: string) {
    this.router.navigateByUrl('/listings/-/-/-/' + seller, { skipLocationChange: false }).then(() => {
      window.location.reload();
    });
  }

  isUsersListing(username: string) {
    return this.userService.username === username;
  }

  deleteListing(id: string | undefined) {
    if (id)
      this.listingService.deleteListing(id).subscribe(success => {
        if (success)
          location.reload();
        else
          alert("Error! Try again later.");
      });
  }

  toggleContactInfo(id: string | undefined) {
    const elements = document.getElementsByClassName("contact-info");
    const self = document.getElementById(id || '');

    if (self)
      self.classList.toggle("hide");

    if (elements && self)
      for (let i = 0; i < elements.length; i++)
        if (elements[i] != self && !elements[i].classList.contains("hide"))
          elements[i].classList.toggle("hide");
  }
}
