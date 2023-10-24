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
export class NavbarUserComponent implements OnInit {
  isLoggedIn = false;
  sesStr: string[] = [];
  userid: string[] = []
  islogInAdmin = false;
  user: any
  images: any;
  urlimages: any = 'https://localhost:7197/'
  firstname: any = {};
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: RegistrationService,
    private SH: SharedService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.http.ShowUser().subscribe((data: any) => {
        this.isLoggedIn = isLoggedIn;
        this.isLoggedIn = this.SH.getStorage('firstname');
        this.sesStr = this.SH.getItem('firstname');
        this.sesStr == data
        this.userid = this.SH.getItem('userid');
        this.images = this.SH.getItem('images')
      });
    });
  }

  logout() {
    sessionStorage.removeItem('firstname');
    sessionStorage.clear();
    this.authService.logout();
    this.router.navigate(['/form']);
  }
}
