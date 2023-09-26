import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { RegistrationService } from 'src/app/registration/registration.service';
import { SharedService } from 'src/app/shared.service';
;
@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  sesStr: string[] = [];
  islogInAdmin = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: RegistrationService,
    private SH: SharedService
  ) {}

  ngOnInit() {
    this.authService.islogInAdmin.subscribe((islogInAdmin) => {
      this.islogInAdmin = islogInAdmin;
      this.islogInAdmin = this.SH.getStorage('firstname');
      this.sesStr = this.SH.getItem('firstname');
      this.SH.getItem('userid');
    });
  }

  logout() {
    sessionStorage.removeItem('firstname');
    sessionStorage.clear();
    this.authService.logout();
    this.router.navigate(['/form']);
  }

}
