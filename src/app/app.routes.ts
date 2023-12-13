import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ListingEditComponent} from "./listing-edit/listing-edit.component";
import {GameCardsComponent} from "./game-cards/game-cards.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {CategoryListComponent} from "./category-list/category-list.component";

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "listing-edit/:id", component: ListingEditComponent},
  {path: "", component: HomePageComponent, pathMatch: "full"},
  {path: "category/:category", component: CategoryListComponent},
];
