import { RegistrationService } from 'src/app/registration/registration.service';
import { SharedService } from 'src/app/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'View-Post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class ViewPostComponent implements OnInit {
  displayedColumns: string[] = ['no', 'firstname', 'title', 'content', 'postlocation', 'images', 'actions' ];
  firstname: any[] = [];
  post: any[] = [];
  mypost: any[] = [];
  approvalstatus: any[] = [];
  
  constructor(private fb: FormBuilder,
    private service: RegistrationService,
    private shared: SharedService,
  ) { }

  ngOnInit() {
    this.service.ShowPost().subscribe((data: any) => {
      this.post = data.filter((post: any) => post.approvalstatus === 1);
      console.log(this.post, 'ShowPost');

    });
    this.shared.getItem('firstname');
    this.shared.getItem('user');
    this.shared.getItem('userid');
    this.shared.getItem('role');
   
    this.firstname = this.shared.getItem('firstname');
  }


  deleteAllPosts() {
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
              this.post = data.filter((post: any) => post.approvalstatus === 1);
            });
          }
        );
      }
    });
  }
}
