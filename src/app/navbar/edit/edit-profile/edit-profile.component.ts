
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth.service';
import { RegistrationService } from '../../../registration/registration.service';
import { SharedService } from '../../../shared.service';
export class Registration {
  username!: string | null;
  password!: string | null;
  email!: string | null;
  role!: string | null;
  firstname!: string | null;
  lastname!: string | null;
  phonenumber!: string | null;
  dateofbirth!: null;
  images ! :string
 
  userId?: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  data: any
  sesStr: any
  userid: any
  registrationForm!: FormGroup;
  userData: Registration = new Registration();
  users: any[] = []; 
  getdataUser : any
  imageUrl: string | undefined;
  isImageDisplayed: boolean = false; // เพิ่มตัวแปร isImageDisplayed
  registrationForms!: FormGroup;
  progress!: number;
  message!: string;
  images: any;
  firstname: any[] = [];
  myuser:any
  user:any[] = []
  public response! : {dbPath : ''}
  constructor(
    private authService: AuthService,
    private router: Router,
    private servince: RegistrationService,
    private SH: SharedService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: RegistrationService,
  ) { }
  ngOnInit() {
    this.userid = this.SH.getItem('userid')
    this.firstname = this.SH.getItem('firstname')
    this.images = this.SH.getItem('images')


    this.route.params.subscribe(params => {
      this.myuser = params['userid'];
      console.log(this.myuser);
      
      this.http.ShowUser().subscribe((data: any) => {
        this.user = data;
        const foundUser = this.user.find(user => user.userid === this.myuser);
        console.log(foundUser,'foutd');
        if (foundUser) {
          this.registrationForm.patchValue(foundUser);
        } else {
          console.log('No user with firstname matching:', this.myuser);
        }
      });
    });
    
    this.createRegistrationForm()
  }

  public updateImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  public onUploadFinished = (event: any) => {
    this.response = event;
    console.log(this.response);
    if (this.response && this.response.dbPath) {
      this.registrationForm.patchValue({
        images: this.response.dbPath
      });
    }
  }

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7197/${serverPath}`; 
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      images : '',
      firstname: '',
      lastname: '', 
      phonenumber: '', 
      dateofbirth: null,
      userid: '',
      role: 'user'
    });
  }
  editUser() {
    if (this.registrationForm.valid) {
      const updatedUserData = this.registrationForm.value;
      this.userid = this.myuser; // Get the user's ID from your data
      console.log(this.userid,'userid');
      
        console.log(updatedUserData,'updatedUserData');
        
      this.servince.editUser(this.userid, updatedUserData).subscribe(
        (response) => {
          Swal.fire('แก้ไขเรียบร้อย', 'กรุณาออกจากระแบบและเข้าใหม่', 'success');
          this.authService.logout()
          this.router.navigate(['/form']);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
      
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out the form correctly!',
      });
    }
  }
}