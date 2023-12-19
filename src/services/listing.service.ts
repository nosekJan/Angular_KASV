import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {Listing} from "../entities/listing";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})

export class ListingService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/";
  userService: UserService = inject(UserService);
  token = this.userService.token;

  public getListings(params: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.url + 'search' + params, {headers:{Authorization: this.token}}).pipe(
      map((jsonListings) =>
        jsonListings.map((jsonListings) => Listing.clone(jsonListings)),
      ),
      catchError((error) => this.errorHandling(error)),
    )
  }

  public saveListing(listing: Listing, image: FileList | null, action: string) {
    return this.http
      .post<Listing>(this.url + action + "-listing", listing, {headers: {Authentication: this.token}})
      .pipe(
        map( imageId =>
          this.http.post(this.url + 'upload-image/' + imageId, image?.item(0), {headers: {Authentication: this.token}})
        ),
        catchError((error) => this.errorHandling(error)
        )
      );
  }

  errorHandling(httpError: any): Observable<never> {
    return EMPTY;
  }

}

export const CATEGORIES: string[] = ["RPG", "FPS", "Strategy", "Puzzle", "Steam key"];
