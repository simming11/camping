import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Registration } from 'src/app/navbar/edit/edit-profile/edit-profile.component';
import { RegistrationService } from 'src/app/registration/registration.service';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';
export class CreatePostComponent {
	postid!: string;
	userId?: string;
	content?: string;
	images?: string[];
	timestamp?: string;
	privacysetting?: string;
  firstname! : string
	// adminapprovals: Adminapproval[];
	// user?: User;
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
  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      content: ['',  Validators.required],
      Image: '', 
      userid : this.users,
      firstname : this.firstname
    });
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      const updatedPostData = this.registrationForm.value;
       this.postid = this.mypost
      // Send a request to update the post data
      console.log(updatedPostData,'updatapostdata');
      
      this.servince.editPost( this.postid, updatedPostData).subscribe(
        (response) => {
          // Handle success, for example, show a success message using Swal
          Swal.fire('Post updated successfully', '', 'success');

          // Redirect to the post details page or any other appropriate page
          // this.router.navigate(['/post-details', this.postId]);
        },
        (error) => {
          console.error('Error updating post:', error);
          // Handle error, show an error message, etc.
        }
      );
    } else {
      // Form is not valid, show an error message or take appropriate action
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out the form correctly!',
      });
    }
  }
}
