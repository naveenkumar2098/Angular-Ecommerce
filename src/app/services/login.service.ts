import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userId: number;
  hasLoggedIn: boolean = false;

  constructor() { }

  isLoggedIn(): boolean {
    return this.hasLoggedIn;
  }

  loggedUserId(id :number): number {
    return this.userId = id;
  }
}
