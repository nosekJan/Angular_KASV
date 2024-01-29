import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Auth} from "../entities/auth";
import {catchError, EMPTY, map, Observable, of, retry} from "rxjs";
import {User} from "../entities/user";
import {Router} from "@angular/router";
import {Listing} from "../entities/listing";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  url = "http://localhost:8080/";

  restrictedUrlPatterns = /(listing-edit|profile)/;

  checkFormValidity(form: FormGroup){
    const controls = Object.keys(form.controls);
    let valid = true;

    controls.forEach(controlName => {
      const control = form.get(controlName);
      if (control) {
        if (!control.valid) {
          console.log(controlName)
          valid = false;
        }
      }
    });

    return valid;
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  set token(value: string) {
    if (value)
      localStorage.setItem('token', value);
    else
      localStorage.removeItem('token');
  }

  get username(): string {
    return localStorage.getItem('username') || '';
  }

  set username(value: string) {
    if (value)
      localStorage.setItem('username', value);
    else
      localStorage.removeItem('username');
  }

  login(auth: Auth): Observable<boolean> {
    return this.http.get(this.url + "login",
      {
        responseType: "text",
        headers: {X_Username: auth.name, X_Password: auth.password}
      }
    ).pipe(
      map(token => {
        this.username = auth.name;
        this.token = token;
        return true;
      })
    );
  }

  logout() {
    this.token = '';
    this.username = '';
    if (this.restrictedUrlPatterns.test(this.router.url))
      this.router.navigateByUrl('/');
  }

  isLogged() :boolean {
    return !!this.token;
  }

  public registerUser(user: User): Observable<boolean> {
     return this.http
      .post<User>(this.url + 'register', user)
      .pipe(
        map(() => { return true }),
        catchError((error) => this.errorHandling(error)
        ),
      )
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(this.url + 'user/' + this.username, {headers:{Authorization: this.token}}).pipe(
      map((userJson) =>
        userJson
      ),
      catchError((error) => this.errorHandling(error)),
    )
  }

  errorHandling(httpError: any): Observable<never> {
    return EMPTY;
  }

}
