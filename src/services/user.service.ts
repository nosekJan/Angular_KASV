import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Auth} from "../entities/auth";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {User} from "../entities/user";
import {MessagingService} from "./messaging.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private messagingService: MessagingService) {
  }

  url = "http://localhost:8080/";

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

  public saveUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.url + 'register', user)
      .pipe(
        map((jsonUser) => User.clone(jsonUser)),
        catchError((error) => this.errorHandling(error)
        ),
      )
  }

  errorHandling(httpError: any): Observable<never> {
    if (httpError instanceof HttpErrorResponse) {
      if (httpError.status === 0) {
        this.messagingService.error('Server is not available!')
      }

      if (httpError.status < 500) {
        const errMessage = httpError.error.errorMessage
          ? httpError.error.errorMessage
          : JSON.parse(httpError.error).errorMessage

        this.messagingService.error(errMessage)
        return EMPTY
      }

      if (httpError.status >= 500) {
        this.messagingService.error(
          'Server has serious problem, for details, look in the console!',
        )
      }
    }
    console.log(httpError)
    return EMPTY
  }

}
