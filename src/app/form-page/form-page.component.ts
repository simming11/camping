import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration/registration.service';
import { SharedService } from '../shared.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})

export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: RegistrationService,
    private SH: SharedService,
    private cookieService: CookieService // Add this line
    
    
        ) 
    { }
  username: string = '';
  password: string = '';
  role: string = 'admin';
  users: any[] = []; 
  
  ngOnInit() {
    this.http.ShowUser().subscribe((data:any) => {
      this.users = data
      console.log(this.users,'showUser');
      
    });
  }

  login() {
    const user = this.users.find(u => u.username === this.username && u.password === this.password && this.role == this.role);
    
    if (user) {
      this.SH.setItem('firstname', user.firstname);
      this.SH.setItem('user', user);
      this.SH.setItem('userid', user.userid);
      this.SH.setItem('role', user.role);
      this.SH.setItem('images',user.images)
      this.cookieService.set('user', JSON.stringify(user));
      
      if (user.role === 'admin') {
        console.log(user.role,'role');
        this.SH.setItem('firstname', user.firstname);
        this.SH.setItem('user', user);
        this.SH.setItem('userid', user.userid);
        this.SH.setItem('role', user.role);
        this.SH.setItem('images',user.images)
        // Redirect to the admin page or any other page for admins
        this.router.navigate(['admin']);
        this.authService.loginAdmin();
        Swal.fire(
          'เข้าสู่ระบบ admin สำเร็จ',
          '',
          'success'
        )
      } else {
        // For non-admin users
        Swal.fire(
          'เข้าสู่ระบบสำเร็จ',
          '',
          'success'
        )
        this.authService.login(); 
        this.router.navigate(['home']);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'โอ้ไม่นะ...',
        text: 'รหัสอะไรสักอย่างหนึ่ง'
      })
      console.log('Login failed');
    }
  }
  
}
