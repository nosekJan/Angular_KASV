import {Component, inject, Input} from '@angular/core';
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
    console.log(id);
    if (id)
      this.listingService.deleteListing(id);
  }

  log(id: string | undefined) {
    console.log(id);
  }
}
