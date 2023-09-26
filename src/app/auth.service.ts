import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegistrationService } from './registration/registration.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private isLoggedInAdminSubject = new BehaviorSubject<boolean>(false);
  islogInAdmin = this.isLoggedInAdminSubject.asObservable();


  constructor(private http :RegistrationService,
    private shared :SharedService
    ) { }

  login() {
    const role = this.shared.getItem('role');
    
    if(role === 'user'){
      this.shared.getItem('firstname')
      this.shared.getItem('user')
      this.shared.getItem('userid')
      this.shared.getItem('role')
      this.isLoggedInSubject.next(true);
    }
  }

  logout() {
    this.isLoggedInSubject.next(false);
    this.isLoggedInAdminSubject.next(false);
  }

  loginAdmin() {
    const role = this.shared.getItem('role'); // Get the user's role from your shared service
  
    if (role === 'admin') {
      this.shared.getItem('firstname')
      this.shared.getItem('user')
      this.shared.getItem('userid')
      this.shared.getItem('role')
      this.isLoggedInAdminSubject.next(true); // Set isLoggedInAdminSubject to true for admin users
    }
  }
  
}

