import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  searchTerm: string = '';
  searchResults: any[] = [];
  ShowPost: any[] = [];
  firstname: string[] = [];
  isLoggedIn = false;
  approvalstatus:any[]=[]
  constructor(
    private http: RegistrationService,
    private SH: SharedService,
    private authService: AuthService
    ) { }
    ngOnInit() {
      this.firstname = this.SH.getItem('firstname')
      this.http.ShowPost().subscribe((data: any) => {
          this.ShowPost = data.filter((post: any) => post.approvalstatus === 1); // Filter posts with approvalstatus 1 (false)
          console.log(this.ShowPost, 'ShowPost');
  
          this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
              this.isLoggedIn = isLoggedIn;
              this.isLoggedIn = this.SH.getStorage('firstname');
              this.SH.getItem('userid');
              this.SH.getItem('role');
              this.SH.getItem('user');
          });
      });
  }
  
  expandInput() {
    const inputElement = document.querySelector('.form-control') as HTMLInputElement;
    inputElement.style.width = '100%';
  }
  performSearch() {
    // if (this.searchTerm) {
    //   this.http.searchUsers(this.searchTerm).subscribe((data :any) => {
    //     console.log("data",data);
        
    //     this.searchResults = data;
    //   });
    // }
  }
  postContent() {
    
  }
}
