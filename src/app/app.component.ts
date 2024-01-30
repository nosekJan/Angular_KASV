import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {MaterialModule} from "../modules/material.module";
import {GameCardComponent} from "./game-card/game-card.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, MaterialModule, GameCardComponent, HomePageComponent, DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
