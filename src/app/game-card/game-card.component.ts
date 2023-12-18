import {Component, inject, OnInit, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {Listing} from "../../entities/listing";
import {ContactInfo} from "../../entities/contact-info";

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})

export class GameCardComponent implements OnInit {

  @Input() listing = new Listing('','','',0,[],'',
    new ContactInfo('','','','','',''));

  constructor() {}

  ngOnInit() {
    console.log(this.listing);
  }
}
