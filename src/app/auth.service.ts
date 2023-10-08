import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegistrationService } from './registration/registration.service';
import { SharedService } from './shared.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private isLoggedInAdminSubject = new BehaviorSubject<boolean>(false);
  islogInAdmin = this.isLoggedInAdminSubject.asObservable();


  constructor(
    private http: RegistrationService,
    private shared: SharedService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }


  login() {
    const role = this.shared.getItem('role');

    if (role === 'user') {

      this.shared.getItem('firstname')
      this.shared.getItem('user')
      this.shared.getItem('userid')
      this.shared.getItem('role')
      // Update isLoggedInSubject with true
      this.isLoggedInSubject.next(true);
    } else {
      // Update isLoggedInSubject with false for non-user roles
      this.isLoggedInSubject.next(false);
    }

    // Always return a boolean value
    return this.isLoggedInSubject.value;
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
      // Update isLoggedInSubject with true
      this.isLoggedInAdminSubject.next(true);
    } else {
      // Update isLoggedInSubject with false for non-user roles
      this.isLoggedInAdminSubject.next(false);
    }

  }


}

