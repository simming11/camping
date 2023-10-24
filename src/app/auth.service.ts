import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegistrationService } from './registration/registration.service';
import { SharedService } from './shared.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
    private router: Router,
    private cookieService: CookieService // Add this line
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }


  login() {
    const role = this.shared.getItem('role');
    console.log(role, 'show');

    if (role === 'user') {
      this.shared.getItem('firstname');
      this.shared.getItem('user');
      this.shared.getItem('userid');
      this.shared.getItem('role');

      // Store user information in cookies
      this.cookieService.set('isLoggedIn', 'true');
      this.cookieService.set('role', role);
      // Update isLoggedInSubject with true
      this.isLoggedInSubject.next(true);
    } else {
      // Update isLoggedInSubject with false for non-user roles
      this.isLoggedInSubject.next(false);
    }

    // Always return a boolean value
    return this.isLoggedInSubject.value;
  }



  loginAdmin() {
    const role = this.shared.getItem('role');

    if (role === 'admin') {
      // Store admin information in cookies
      this.cookieService.set('isAdminLoggedIn', 'true');
      this.cookieService.set('role', role);

      // Update isLoggedInAdminSubject with true
      this.isLoggedInAdminSubject.next(true);

      this.shared.getItem('firstname');
      this.shared.getItem('user');
      this.shared.getItem('userid');
      this.shared.getItem('role');
    } else {
      // Update isLoggedInAdminSubject with false for non-admin roles
      this.isLoggedInAdminSubject.next(false);
    }
  }


  logout() {
    // Clear cookies when the user logs out
    this.cookieService.delete('isLoggedIn');
    this.cookieService.delete('role');

    this.isLoggedInSubject.next(false);
    this.isLoggedInAdminSubject.next(false);
  }





}

