import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration/registration.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit{
  isLoggedIn = false;
  sesStr: string[] = [];
  islogInAdmin = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: RegistrationService,
    private SH: SharedService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.isLoggedIn = this.SH.getStorage('firstname');
      this.sesStr = this.SH.getItem('firstname');
      this.SH.getItem('userid');
    });

    // this.authService.islogInAdmin.subscribe((islogInAdmin) => {
    //   this.islogInAdmin = islogInAdmin;
    //   this.islogInAdmin = this.SH.getStorage('firstname');
    //   this.sesStr = this.SH.getItem('firstname');
    //   this.SH.getItem('userid');
    // });
    // this.authService.islogInAdmin.subscribe((islogInAdmin) => {
    //   this.islogInAdmin = islogInAdmin;
    //   this.islogInAdmin = this.SH.getStorage('firstname');
    //   this.sesStr = this.SH.getItem('firstname');
    //   this.SH.getItem('userid');
    // });
  }

  logout() {
    sessionStorage.removeItem('firstname');
    sessionStorage.clear();
    this.authService.logout();
    this.router.navigate(['/form']);
  }
}
