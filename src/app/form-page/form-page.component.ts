import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../registration/registration.service';
import { SharedService } from '../shared.service';
import Swal from 'sweetalert2';
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
    private SH: SharedService) 
    { }
  username: string = '';
  password: string = '';
  users: any[] = []; 

  ngOnInit() {
    this.http.ShowUser().subscribe((data:any) => {
      this.users = data
      console.log(this.users);
      
    });
  }

  login() {
    const user = this.users.find(u => u.username === this.username && u.password === this.password);
    if (user) {
      var ssss= this.SH.setItem('firstname', user.firstname)
      console.log(ssss,'ssssssss');
    var log = this.SH.setItem('user',user)
  
      this.SH.setItem('userid', user.userid)
      Swal.fire(
        'เข้าสู้ระบบสำเร็จ',
        '',
        'success'
      )
      this.authService.login(); 
      this.router.navigate(['home']);
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
