import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegistrationService } from './registration/registration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http :RegistrationService) { }

  login() {
    this.http.ShowUser().subscribe((data) => {
      
    });
    this.isLoggedInSubject.next(true);
  }

  logout() {
    this.isLoggedInSubject.next(false);
  }
}

