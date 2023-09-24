import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/registration/registration.service';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css']
})
export class MypostComponent implements OnInit{
  users: any[] = []; 
  firstname: any[] = [];
  ShowPost: any[] = [];
  mypost : any[] = [];
  constructor( private fb: FormBuilder, 
    private service: RegistrationService, 
    private router: Router,
    private SH: SharedService,
    
    ) 
    {}

  ngOnInit(){
    this.firstname = this.SH.getItem('firstname')
    this.service.ShowPost().subscribe((data: any) => {
      this.ShowPost = data.filter((post: any) => post.firstname === this.firstname);
      console.log(this.ShowPost, 'ShowPost');
    });
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
              this.ShowPost = data.filter((post: any) => post.firstname === this.firstname);
              console.log(this.ShowPost, 'ShowPost');
            });
          }
          );
          
      }
    });
  }
  
}
