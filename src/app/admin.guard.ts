import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegistrationService } from './registration/registration.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  
  constructor(
    private service: RegistrationService, 
    private router: Router,
    private auth:AuthService
    ) {}
    users:any[]=[
      
    ]
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.islogInAdmin) {
      return true;
    } else {
      // Redirect to a forbidden page or show an error message
      this.router.navigate(['/forbidden']);
      return false;
    }
  }
}
