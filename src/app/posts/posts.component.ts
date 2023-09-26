import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegistrationService } from '../registration/registration.service';
import { User } from '../registration/registration.component';
import { SharedService } from '../shared.service';
import { FileUploadService } from './file-upload.service';

export class CreatePostComponent {
  postid!: string;
  userId?: string;
  content?: string;
  images?: string[];
  timestamp?: string;
  privacysetting?: string;
  firstname!: string
  // adminapprovals: Adminapproval[];
  // user?: User;
}
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postForm!: FormGroup; // สร้าง FormGroup
  userData: CreatePostComponent = new CreatePostComponent();
  users: any[] = [];
  firstname: any[] = [];
  dataSission: any[] = [];
  selectedFiles: File[] = [];
  constructor(private fb: FormBuilder,
    private service: RegistrationService,
    private router: Router,
    private SH: SharedService,
    private fileUploadService: FileUploadService
  ) {
    this.CreatePostComponent();
  }
  ngOnInit() {
    this.users = this.SH.getItem('userid')
    console.log(this.users, 'user');

    this.firstname = this.SH.getItem('firstname')
    console.log(this.users, 'firstname');


    this.CreatePostComponent()

  }
  CreatePostComponent() {
    this.postForm = this.fb.group({
      content: ['', Validators.required],
      Image: '',
      userId: this.users,
      firstname: this.firstname
      // 
    });
  }
  onSubmit() {
    if (this.postForm.valid) {

      const registrationData: CreatePostComponent = this.postForm.value;

      console.log(registrationData, "value");
      const requestBody = JSON.stringify(registrationData);
      this.SH.setItem('registrationData', registrationData)
      this.service.createpost(requestBody).subscribe(
        (res: any) => {
          console.log("สำเร็จ");
          console.log(res, 'res');
          Swal.fire(
            'ขอบคุณสำหรับโพสต์',
            'เราได้ส่งโพสของคุณให้ผู้ดูแลอนุมัติแล้ว',
            'success'
          )

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
