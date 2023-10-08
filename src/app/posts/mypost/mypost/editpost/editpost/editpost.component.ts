import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Registration } from '../../../../../navbar/edit/edit-profile/edit-profile.component';
import { AuthService } from '../../../../../auth.service';
import { RegistrationService } from '../../../../../registration/registration.service';
import { SharedService } from '../../../../../shared.service';
export class CreatePostComponent {
	postid!: string;
	userId?: string;
	content?: string;
	images?: string[];
	timestamp?: string;
	privacysetting?: string;
  firstname! : string
  postlocation! : string
  approvalstatus! : number
  imageUrl: string | undefined;
  title!: any
  urlimages : any = 'https://localhost:7197/'
}
@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})


export class EditpostComponent implements OnInit {
  data: any
  mypost: any
  registrationForm!: FormGroup;
  userData: Registration = new Registration();
  post: any[] = []; 
  users: any[] = []; 
  firstname: any[] = [];
  getdataUser : any
  postid:any
  imageUrl: string | undefined;
  images: any;
  approvalstatus! :number
  ttitle!: any
  urlimages : any = 'https://localhost:7197/'
  public response! : {dbPath : ''}
  constructor(
    private authService: AuthService,
    private router: Router,
    private servince: RegistrationService,
    private SH: SharedService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: RegistrationService
  ) { }
  ngOnInit(){
     this.users = this.SH.getItem('userid')
     this.firstname = this.SH.getItem('firstname')
     this.images = this.SH.getItem('images')

    this.route.params.subscribe(params => {
      this.mypost = params['mypost'];
      this.http.ShowPost().subscribe((data: any) => {
        this.post = data;
        const foundUser = this.post.find(post => post.postid === this.mypost);
        console.log(foundUser,'foutd');
        if (foundUser) { 
          this.registrationForm.patchValue(foundUser);
        } else {
          console.log('No user with firstname matching:', this.mypost);
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
    // Assign this.response.dbPath to the images field
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
      content: ['',  Validators.required],
      images: '', 
      userid : this.users,
      firstname : this.firstname,
      approvalstatus: '1',
      postlocation: '',
      title: '',
      timestamp: ''
    });
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      const updatedPostData = this.registrationForm.value;
       this.postid = this.mypost
      console.log(updatedPostData,'updatapostdata');
      
      this.servince.editPost( this.postid, updatedPostData).subscribe(
        (response) => {
          Swal.fire('Post updated successfully', '', 'success');
        },
        (error) => {
          console.error('Error updating post:', error);
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
