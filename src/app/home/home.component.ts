import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  searchResults: any[] = [];
  ShowPost: any[] = [];
  firstname: string[] = [];
  isLoggedIn = false;
  approvalstatus: any[] = [];
  filteredEmployees: any;
  employeeList: any;
  filteredPosts: any[] = [];
 
  constructor(
    private http: RegistrationService,
    private SH: SharedService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    
    this.firstname = this.SH.getItem('firstname');
    this.http.ShowPost().subscribe((data: any) => {
      this.ShowPost = data.filter((post: any) => post.approvalstatus === 1); // Filter posts with approvalstatus 1 (true)
      console.log(this.ShowPost, 'ShowPost');

      this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
        this.isLoggedIn = this.SH.getStorage('firstname');
        this.SH.getItem('userid');
        this.SH.getItem('role');
        this.SH.getItem('user');
        this.search()
      });
    });
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:7197/${serverPath}`;
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      // Perform the search operation by calling the service
      this.http.searchPosts(this.searchTerm).subscribe((data: any) => {
        this.filteredPosts = data;
        console.log(this.filteredPosts);
        
      });
    } else {
      // If the search term is empty, show all posts
      this.filteredPosts = this.ShowPost;
      console.log( this.filteredPosts ,'not');
      
    }
  }
  
}
