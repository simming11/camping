import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RegistrationService } from './registration/registration.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (state.url === '/admin'  || state.url === '/Approvalstatus') { // Check if the user is trying to access '/post'
      return this.authService.islogInAdmin.pipe(
        map((islogInAdmin: boolean) => {
          if (islogInAdmin) {
            return true; // Allow access to '/post'
          } else {
            // Redirect to the login page if the user is not logged in
            return this.router.createUrlTree(['/**']);
          }
        })
      );
    } else {
      return this.router.createUrlTree(['/**']);
    }
  }
    
}
