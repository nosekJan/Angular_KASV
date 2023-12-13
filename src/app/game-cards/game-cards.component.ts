import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {Listing} from "../../entities/listing";
import {ContactInfo} from "../../entities/contact-info";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-game-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './game-cards.component.html',
  styleUrl: './game-cards.component.css'
})
export class GameCardsComponent implements OnInit {

  listing: Listing = new Listing('','','',0,[], '',
    new ContactInfo('','','','','',''));

  ngOnInit() {
  }
}
