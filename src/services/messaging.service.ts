import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  msgSubject = new Subject<Message>()

  constructor() {}

  getMessages(): Observable<Message> {
    return this.msgSubject.asObservable()
  }

  error(message: string) {
    this.msgSubject.next({ message, type: 'error' })
  }

  success(message: string) {
    this.msgSubject.next({ message, type: 'success' })
  }
}

export interface Message {
  message: string
  type: 'error' | 'success'
}
