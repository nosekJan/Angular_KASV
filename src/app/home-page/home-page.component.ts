import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameCardsComponent} from "../game-cards/game-cards.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, GameCardsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
