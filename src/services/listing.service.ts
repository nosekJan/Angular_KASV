import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {Listing} from "../entities/listing";

@Injectable({
  providedIn: 'root'
})

export class ListingService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/";
  private Group: any;

  public getListings(params: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.url + 'search').pipe(
      map((jsonListings) =>
        jsonListings.map((jsonListings) => Listing.clone(jsonListings)),
      ),
      catchError((error) => this.errorHandling(error)),
    )
  }

  errorHandling(httpError: any): Observable<never> {
    return EMPTY;
  }

}

export const CATEGORIES: string[] = ["RPG", "FPS", "Strategy", "Puzzle", "Steam key"];
