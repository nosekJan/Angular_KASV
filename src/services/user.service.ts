import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Auth} from "../entities/auth";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {User} from "../entities/user";
import {Listing} from "../entities/listing";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  constructor(private http: HttpClient) {}

  url = "http://localhost:8080/";

  private _location = '';

  username: string = "";

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  set token(value: string) {
    if (value)
      localStorage.setItem('token', value);
    else
      localStorage.removeItem('token');
  }

  login(auth: Auth): Observable<boolean> {
    return this.http.get(this.url + "login",
      {
        responseType: "text",
        headers: {username: auth.name, password: auth.password}
      }
    ).pipe(
      map(token => {
        this.token = token;
        this.username = auth.name;
        return true;
      })
    );
  }

  logout() {
    this.token = ''
    this.username = ''
  }

  isLogged() :boolean {
    return !!this.token;
  }

  public registerUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.url + 'register', user)
      .pipe(
        map((jsonUser) => User.clone(jsonUser)),
        catchError((error) => this.errorHandling(error)
        ),
      )
  }

  public saveListing(listing: Listing, action: string) {
    return this.http
      .post<Listing>(this.url + action + "-listing", listing, {headers: {Authentication: this.token}})
      .pipe(
        map((jsonUser) => Listing.clone(jsonUser)),
        catchError((error) => this.errorHandling(error)
        ),
      )
  }

  errorHandling(httpError: any): Observable<never> {
    return EMPTY;
  }

}
