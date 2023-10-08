import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegistrationService } from '../../../registration/registration.service';
import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css']
})
export class MypostComponent implements OnInit{
  displayedColumns: string[] = ['no', 'title', 'content', 'postlocation','images' ,'actions'];
  users: any[] = []; 
  firstname: any[] = [];
  post: any[] = [];
  mypost : any[] = [];
  approvalstatus: any[] = [];

  constructor( private fb: FormBuilder, 
    private service: RegistrationService, 
    private router: Router,
    private shared: SharedService, 
    ) 
    {}

  ngOnInit(){
    this.shared.getItem('firstname')
    this.shared.getItem('user')
    this.shared.getItem('userid')
    this.shared.getItem('role')
    this.firstname = this.shared.getItem('firstname')
    this.service.ShowPost().subscribe((data: any) => {
      this.post = data.filter((post: any) => post.firstname === this.firstname );
      console.log(this.post, 'ShowPost');
    });
  }
  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7197/${serverPath}`; 
  }
  confirmDelete(postId: number) {
    Swal.fire({
      title: 'Do you want to delete this post?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked the "Delete" button
        this.service.deletePost(postId).subscribe(
          () => {
            Swal.fire();
            // Optionally, you can update your post list or perform other actions after deletion.
          },
          (error) => {
            Swal.fire('Deleted!', 'The post has been deleted.', 'success');
            this.service.ShowPost().subscribe((data: any) => {
              this.post = data.filter((post: any) => post.firstname === this.firstname);
              console.log(this.post, 'ShowPost');
            });
          }
          );
          
      }
    });
  }
  
}
