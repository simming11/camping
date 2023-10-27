import { FormBuilder } from '@angular/forms';
import { RegistrationService } from 'src/app/registration/registration.service';
import { SharedService } from 'src/app/shared.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit{
  displayedColumns: string[] = ['no', 'firstname','images', 'actions'];
  post: any[] = [];
  firstname: any[] = [];
  mypost: any[] = [];
  constructor(private fb: FormBuilder,
    private service: RegistrationService,
    private shared: SharedService,
  ) { }

  ngOnInit() {
    this.service.ShowUser().subscribe((data:any) => {
      this.post = data
      console.log(this.post,'showUser');
      
    });
    this.shared.getItem('firstname');
    this.shared.getItem('user');
    this.shared.getItem('userid');
    this.shared.getItem('role');
    this.firstname = this.shared.getItem('firstname');
    // Remove this line, as dataSource is not defined in your code
    // this.dataSource.paginator = this.paginator;
  }




  public createImgPath = (serverPath: string) => {
    return `https://localhost:7197/${serverPath}`;
  }

  confirmDelete(userid: any) {
    Swal.fire({
      title: 'Do you want to delete this post?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked the "Delete" button
        this.service.deleteUser(userid).subscribe(
          () => {
            Swal.fire();
            // Optionally, you can update your post list or perform other actions after deletion.
          },
          (error) => {
            Swal.fire('Deleted!', 'The post has been deleted.', 'success');
            this.service.ShowUser().subscribe((data:any) => {
              this.post = data
              
            });
          }
        );
      }
    });
  }

}
