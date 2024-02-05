import { Injectable } from '@angular/core';
import {EMPTY, Observable, Subject} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  msgSubject = new Subject<Message>()

  getMessages(): Observable<Message> {
    return this.msgSubject.asObservable()
  }

  error(message: string) {
    this.msgSubject.next({ message, type: 'error' })
  }

  success(message: string) {
    this.msgSubject.next({ message, type: 'success' })
  }

  errorHandling(httpError: any, message?: string): Observable<never> {
    if (httpError instanceof HttpErrorResponse) {
      console.log(httpError);

      if (httpError.status === 0) {
        this.error('Server is not available!')
      }

      else if (httpError.status < 500 && message) {
        this.error(message);
      }

      else if (httpError.status < 500) {
        this.error('Error! Check console for further details!');
      }

      else if (httpError.status >= 500) {
        this.error('Server has serious problem, for details, look in the console!')
      }
    }

    return EMPTY;
  }
}

export interface Message {
  message: string
  type: 'error' | 'success'
}
