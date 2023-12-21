import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameCardComponent} from "../game-card/game-card.component";
import {CATEGORIES, ListingService} from "../../services/listing.service";
import {ActivatedRoute, NavigationEnd, ParamMap, Router, RouterLink} from "@angular/router";
import {Listing} from "../../entities/listing";
import {UserService} from "../../services/user.service";
import {switchMap} from "rxjs";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, GameCardComponent, RouterLink, FormsModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent implements OnInit {

  categories = CATEGORIES;
  listingService: ListingService = inject(ListingService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  paramMap: ParamMap = this.route.snapshot.paramMap;

  titleSearchString = '';

  category = this.paramMap.get('category');
  title = this.paramMap.get('title');
  maxPrice = this.paramMap.get('maxPrice');
  seller = this.paramMap.get('seller');
  searchParams = `?category=${this.category}&title=${this.title}&maxPrice=${this.maxPrice}&seller=${this.seller}`;

  listings: Listing[] = [];

  ngOnInit() {
    this.listingService.getListings(this.searchParams)
      .subscribe(listings => this.listings = listings);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
  }



  searchByTitle() {

  }

  protected readonly Listing = Listing;
}
