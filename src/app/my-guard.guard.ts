import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (state.url === '/post' || state.url === '/Mypost') { // Check if the user is trying to access '/post'
      return this.authService.isLoggedIn$.pipe(
        map((isLoggedIn: boolean) => {
          if (isLoggedIn) {
            return true; // Allow access to '/post'
          } else {
            // Redirect to the login page if the user is not logged in
            return this.router.createUrlTree(['/form']);
          }
        })
      );
    } else {
      return true
    }
  }
}
