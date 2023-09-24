import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration/registration.service';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  sesStr : string[] = []
  constructor(
    private authService: AuthService,
    private router: Router,
    private http :RegistrationService,
    private SH: SharedService) 
    { }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.isLoggedIn = this.SH.getStorage('firstname');
      this.sesStr =  this.SH.getItem('firstname',)
     var  sssqq = this.SH.getItem('userid');
      console.log(this.sesStr,'sssseqwefg');
      console.log(sssqq,'sssssqqq');
      
      
    });
  }
  logout() {
    sessionStorage.removeItem('firstname');
    sessionStorage.clear();
    this.authService.logout();
    this.router.navigate(['/form']);
  }
  
} 
  