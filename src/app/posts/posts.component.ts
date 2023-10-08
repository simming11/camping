import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegistrationService } from '../registration/registration.service';
import { SharedService } from '../shared.service';
import { FileUploadService } from './file-upload.service';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';


export class CreatePostComponent {
  postid!: string;
  userId?: string;
  content?: string;
  images!: string
  timestamp?: string;
  privacysetting?: string;
  firstname!: string
  approvalstatus! : number
  imageUrl: string | undefined;
  postlocation! : string
  title!: any
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
  public response! : {dbPath : ''}
  imageUrl: string | undefined;
  images: any;
  urlimages : any = 'https://localhost:7197/'
  title!: any
  islogInAdmin = false;
  isLoggedIn = false;
  constructor(private fb: FormBuilder,
    private service: RegistrationService,
    private SH: SharedService,
    private authService: AuthService,
    private router: Router,
    private http: RegistrationService,
  ) {
    this.CreatePostComponent();
  }
  ngOnInit() {
    this.users = this.SH.getItem('userid')
    console.log(this.users, 'user');

    this.firstname 
    console.log(this.users, 'firstname');
    this.images = this.SH.getItem('images')
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.http.ShowUser().subscribe((data: any) => {
        this.isLoggedIn = isLoggedIn;
        this.isLoggedIn = this.SH.getStorage('firstname');
        this.firstname  = this.SH.getItem('firstname');
        this.SH.getItem('userid');
         this.images = this.SH.getItem('images')
      });
    });


    this.CreatePostComponent()

  }
  CreatePostComponent() {
    this.postForm = this.fb.group({
      content: ['', Validators.required],
      images: '',
      userId: this.users,
      firstname: this.firstname,
      approvalstatus: '0',
      postlocation: '',
      title: ''
      // 
    });
  }

  public onUploadFinished = (event: any) => {
    this.response = event;
    console.log(this.response);
  
    // Assign this.response.dbPath to the images field
    if (this.response && this.response.dbPath) {
      this.postForm.patchValue({
        images: this.response.dbPath
      });
    }
  }
  
  public updateImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
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
