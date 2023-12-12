import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameCardsComponent} from "../game-cards/game-cards.component";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, GameCardsComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

}
