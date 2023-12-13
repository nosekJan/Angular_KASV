import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameCardsComponent} from "../game-cards/game-cards.component";
import {CATEGORIES, ListingService} from "../../services/listing.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Listing} from "../../entities/listing";
import {UserService} from "../../services/user.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, GameCardsComponent, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories = CATEGORIES;
  listingService: ListingService = inject(ListingService);
  route: ActivatedRoute = inject(ActivatedRoute);
  selectedCategory = this.route.snapshot.paramMap.get('category');
  listings: Listing[] = [];

  ngOnInit() {
    this.listingService.getListings("?category=" + this.selectedCategory)
      .subscribe(listings => this.listings = listings);
  }
}
