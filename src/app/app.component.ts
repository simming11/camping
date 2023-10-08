import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { SharedService } from './shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  sesStr: string[] = [];
  isLoggedIn = false; // Set this based on user's authentication status
  islogInAdmin = false; // Set this based on user's role

  constructor(
    private authService: AuthService,
    private SH: SharedService
  ) {}
  ngOnInit() {
    // Check if the user is logged in
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      this.sesStr = this.SH.getItem('firstname');
    });
  
    // Check if the user is an admin
    this.authService.islogInAdmin.subscribe((islogInAdmin: boolean) => {
      this.islogInAdmin = islogInAdmin;
      this.sesStr = this.SH.getItem('firstname');
    });
  
    // Retrieve the user's role from session storage and set the appropriate flags
    const role = this.SH.getItem('role');
    if (role === 'admin') {
      this.islogInAdmin = true;
      
    } else {
      this.isLoggedIn = true;
      // this.islogInAdmin = false;
      // this.isLoggedIn = true;
    }
  }
  
  
}