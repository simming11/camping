import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import {Guid} from 'guid-typescript';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CreatePostComponent } from '../posts/posts.component';


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
    private router: Router
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
      dateofbirth: null,
    });
  }
  onSubmit() {
    if (this.registrationForms.valid) {
      const registrationData: User = this.registrationForms.value;
      console.log(registrationData, "value");
      const requestBody = JSON.stringify(registrationData); 
    const res =  this.service.postData(requestBody).subscribe(
        (res: any) => {
          console.log("สำเร็จ");
          console.log(res, 'res');
          this.router.navigate(['home']);
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
      })
      console.log('กรุณากรอกข้อมูลให้ถูกต้อง');
    }
  }
  
}
