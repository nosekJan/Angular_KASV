import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameCardsComponent} from "../game-cards/game-cards.component";
import {RouterLink} from "@angular/router";
import {CATEGORIES} from "../../services/listing.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, GameCardsComponent, RouterLink, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  categories = CATEGORIES;
  searchString: string = '';

  onSubmit() {

  }
}
