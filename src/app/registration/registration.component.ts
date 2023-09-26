import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import {Guid} from 'guid-typescript';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CreatePostComponent } from '../posts/posts.component';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth.service';


export class User {
  userid!: string;
  username!: string | null;
  password!: string | null;
  email!: string | null;
  role!: string | null;
  firstname!: string | null;
  lastname!: string | null;
  phonenumber!: string | null;
  dateofbirth!: null;
  avatar ! :string
  // adminapprovals!: Adminapproval[];
  // posts!: CreatePostComponent[];
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForms!: FormGroup;
  userData: User = new User();
  constructor(
    private fb: FormBuilder, 
    private service: RegistrationService, 
    private router: Router,
    private SH: SharedService,
    private authService: AuthService
    ) 
    {
      this.createRegistrationForm();
    }
  ngOnInit(): void {
    this.createRegistrationForm();
  }


  createRegistrationForm() {
    this.registrationForms = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      avatar : '',
      firstname: '',
      lastname: '', 
      phonenumber: '',
      role: 'user', 
      dateofbirth: null,
    });
  }
  // onSubmit() {
  //   if (this.registrationForms.valid) {
  //     const registrationData: User = this.registrationForms.value;
  //     console.log(registrationData, "value");
  //     const requestBody = JSON.stringify(registrationData); 
  //   const res =  this.service.postData(requestBody).subscribe(
  //       (res: any) => {
  //         console.log("สำเร็จ");
  //         console.log(res, 'res');
  //         this.SH.setItem('user', registrationData);
  //         this.authService.login(); 
  //         this.router.navigate(['home']);
  //       },
  //       (error: any) => {
  //         console.error("เกิดข้อผิดพลาด", error);
  //       }
  //     );

  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'กรุณากรอกให้ถูกต้อง!',
  //     })
  //     console.log('กรุณากรอกข้อมูลให้ถูกต้อง');
  //   }
  // }
  onSubmit() {
    if (this.registrationForms.valid) {
      const registrationData: User = this.registrationForms.value;
      console.log(registrationData, "value");
      const requestBody = JSON.stringify(registrationData); 
  
      this.service.postData(requestBody).subscribe(
        (res: any) => {
          console.log("สำเร็จ");
          console.log(res, 'res');
          this.SH.setItem('firstname', registrationData.firstname);
          this.SH.setItem('user', registrationData);
          this.SH.setItem('userid', registrationData.userid);
          this.SH.setItem('role', registrationData.role);
  
          // Call the login method here to automatically log in the user after registration
          this.authService.login(); 
  
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error("เกิดข้อผิดพลาด", error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'กรุณากรอกให้ถูกต้อง!',
      });
      console.log('กรุณากรอกข้อมูลให้ถูกต้อง');
    }
  }
  
  
}
