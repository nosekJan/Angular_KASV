import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameCardComponent} from "../game-card/game-card.component";
import {Router, RouterLink} from "@angular/router";
import {CATEGORIES} from "../../services/listing.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, GameCardComponent, RouterLink, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  router = inject(Router);

  categories = CATEGORIES;
  searchString: string = '';

  searchByTitle() {
    const title: string = this.searchString === '' ? '-' : this.searchString;
    this.router.navigateByUrl(`listings/-/${title}/-/-`);
  }
}
