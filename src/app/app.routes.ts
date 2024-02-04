import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ListingEditComponent} from "./listing-edit/listing-edit.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {ListingsComponent} from "./listings/listings.component";
import {ProfileCardComponent} from "./profile-card/profile-card.component";
import {authGuard} from "./auth.guard";

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "listing-edit", component: ListingEditComponent,canActivate: [authGuard]},
  {path: "listing-edit/:id", component: ListingEditComponent, canActivate: [authGuard]},
  {path: "", component: HomePageComponent, pathMatch: "full"},
  {path: "listings/:category/:title/:maxPrice/:seller", component: ListingsComponent},
  {path: "profile", component: ProfileCardComponent, canActivate: [authGuard]}
];
