import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';;
import Swal from 'sweetalert2';
import { Registration } from '../../../navbar/edit/edit-profile/edit-profile.component';
import { RegistrationService } from '../../../registration/registration.service';
import { SharedService } from '../../../shared.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-approvalstatus',
  templateUrl: './approvalstatus.component.html',
  styleUrls: ['./approvalstatus.component.css']
})
export class ApprovalstatusComponent implements OnInit {
  displayedColumns: string[] = ['no', 'title', 'content', 'postlocation','images' ,'actions'];
  ShowPost: any[] = [];
  isLoggedIn = false;
  firstname: string | null = null;
  users: any[] = []; 
  userData: Registration = new Registration();

  constructor(
    private http: RegistrationService,
    private SH: SharedService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.firstname = this.SH.getItem('firstname');
    
    this.http.ShowPost().subscribe((data: any) => {
      // Filter posts with approvalstatus 0 (assuming 0 means false)
      this.ShowPost = data.filter((post: any) => post.approvalstatus === 0);
      console.log(this.ShowPost, 'ShowPost');

      this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        this.isLoggedIn = this.SH.getItem('firstname');
        this.SH.getItem('userid');
        this.SH.getItem('role');
        this.SH.getItem('user');
      });
    });

  }
  
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7197/${serverPath}`; 
  }

  approvePost(post: any) {
    // Set the updated approval status
    const updatedPost = { ...post, approvalstatus: 1 };
  
    // Call the editPost method to update the post
    this.http.editPost(post.postid, updatedPost).subscribe((response: any) => {
      Swal.fire(
        '',
        'อนุมัติเรียบร้อย',
        'success'
      )
      this.http.ShowPost().subscribe((data: any) => {
        this.ShowPost = data.filter((post: any) => post.approvalstatus === 0);
      });
      post.approvalstatus = 1;
    });
  }
  

  disapprovePost(post: any) {
  // Set the updated approval status to 0 (disapproved)
  const updatedPost = { ...post, approvalstatus: 2 };

  // Call the editPost method to update the post
  this.http.editPost(post.postid, updatedPost).subscribe((response: any) => {
    Swal.fire(
      '',
      'ไม่อนุมัติเรียบร้อย',
      'success'
    );
    
    // Update the local data if needed (optional)
    this.http.ShowPost().subscribe((data: any) => {
      this.ShowPost = data.filter((post: any) => post.approvalstatus === 0);
    });
    
    // Update the approvalstatus of the post
    post.approvalstatus = 2;
  });
}

}
