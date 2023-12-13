import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameCardsComponent} from "../game-cards/game-cards.component";
import {CATEGORIES} from "../../services/listing.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, GameCardsComponent, RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  categories = CATEGORIES;
}
