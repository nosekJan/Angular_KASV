import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameCardComponent} from "../game-card/game-card.component";
import {CATEGORIES, ListingService} from "../../services/listing.service";
import {ActivatedRoute, NavigationEnd, ParamMap, Router, RouterLink} from "@angular/router";
import {Listing} from "../../entities/listing";
import {FormsModule} from "@angular/forms";
import {filter} from "rxjs";

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, GameCardComponent, RouterLink, FormsModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent implements OnInit {

  listingService: ListingService = inject(ListingService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  maxPriceLimit = 300;
  selectedCategory = '';
  titleSearch = '';

  listings: Listing[] = [];

  ngOnInit() {
    this.loadListings();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Perform actions when the URL changes
      this.handleUrlChange();
    });
  }

  loadListings() {
    this.listingService.getListings(this.generateParams())
      .subscribe(listings => {
        this.listings = listings;
      });
  }

  handleUrlChange() {
    this.loadListings();

    const paramMap: ParamMap = this.route.snapshot.paramMap;

    const category = paramMap.get('category');
    this.selectCategory(category || '', true);

    const maxPrice = paramMap.get('maxPrice');
    this.maxPriceLimit = maxPrice && maxPrice != '-' ? Number.parseInt(maxPrice) : 300;

    const title = paramMap.get('title');
    this.titleSearch = title && title != '-' ? title : '';
  }

  selectCategory(category: string, set: boolean) {
    const selectedBtn = document.getElementById(category.replace(' ', ''));
    const buttons = document.getElementsByClassName("category-select-btn");

    if (buttons) {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
      }
    }

    if (selectedBtn) {
      if (this.selectedCategory != category || set) {
        selectedBtn.classList.add("active");
        this.selectedCategory =  category;
      }
      else {
        this.selectedCategory = '';
        selectedBtn.classList.remove("active");
      }
    }

  }

  generateParams() {
    const paramMap: ParamMap = this.route.snapshot.paramMap;
    const category = paramMap.get('category');
    const title = paramMap.get('title');
    const maxPrice = paramMap.get('maxPrice');
    const seller = paramMap.get('seller');
    return `?category=${category}&title=${title}&maxPrice=${maxPrice}&seller=${seller}`;
  }

  search() {
    const category = this.selectedCategory ? this.selectedCategory : '-';
    const price = this.maxPriceLimit < 300 ? this.maxPriceLimit : '-';
    const title = this.titleSearch ? this.titleSearch : '-';
    this.router.navigateByUrl(`listings/${category}/${title}/${price}/-`);
  }

  protected readonly CATEGORIES = CATEGORIES;
}
