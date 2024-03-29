import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, of, retry, switchMap} from "rxjs";
import {Listing} from "../entities/listing";
import {UserService} from "./user.service";
import {User} from "../entities/user";
import {DialogService} from "./dialog.service";

@Injectable({
  providedIn: 'root'
})

export class ListingService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8080/";
  userService: UserService = inject(UserService);
  dialogService: DialogService = inject(DialogService);
  token = this.userService.token;

  public getListings(params: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(this.url + 'search' + params, {headers:{Authorization: this.token}}).pipe(
      map((jsonListings) =>
        jsonListings.map((jsonListings) => Listing.clone(jsonListings)),
      ),
      catchError((error) => this.dialogService.errorHandling(error)),
    )
  }

  public getListing(id: string): Observable<Listing> {
    return this.http.get<Listing>(this.url + 'listing/' + id, {headers:{Authorization: this.token}}).pipe(
      map((listingJson) =>
        listingJson
      ),
      catchError((error) => this.dialogService.errorHandling(error)),
    )
  }

  public saveListing(listing: Listing, action: string): Observable<any> {
    return this.http
      .post(this.url + action + "-listing", listing, { headers: { Authentication: this.token }, responseType: "text"})
      .pipe(
        map(imageId => {
          return imageId}
        ),
        catchError((error) => this.dialogService.errorHandling(error))
      );
  }

  public deleteListing(id: string): Observable<any> {
    return this.http
      .delete(this.url + 'delete-listing/' + id, {headers:{Authorization: this.token}})
      .pipe(
        map(() => {
          return true;
        }),
        catchError((error) => this.dialogService.errorHandling(error))
    );
  }

  public saveImage(image: File | null, imageId: string) {
    const formData = new FormData();
    if (image)
      formData.append('file', image);
    return this.http.post(this.url + 'upload-image/' + imageId, formData,
                  { headers: { Authentication: this.token},
                          responseType: "text"})
      .pipe(
        map(() => {
          return true;
        }),
        catchError((error) => this.dialogService.errorHandling(error))
      );
  }

  public getImage(id: string): Observable<File> {
    return this.http.get<File>(this.url + 'get-image/' + id, {headers:{Authorization: this.token}}).pipe(
      map((image) =>
        image
      ),
      catchError((error) => this.dialogService.errorHandling(error)),
    )
  }

}

export const CATEGORIES: string[] = ["RPG", "FPS", "Strategy", "Puzzle", "Steam key"];
