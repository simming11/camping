import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { RegistrationService } from '../registration/registration.service';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class  AdminComponent implements OnInit {
  panelOpenState = false;
  searchTerm: string = '';
  searchResults: any[] = [];
  ShowPost: any[] = [];
  firstname: string[] = [];
  isLoggedIn = false;
  approvalstatus: any[] = [];
  filteredEmployees: any;
  employeeList: any;
  filteredPosts: any[] = [];
  users: any[] = [];
  constructor(
    private http: RegistrationService,
    private SH: SharedService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.http.ShowUser().subscribe((data:any) => {
      this.users = data
      console.log(this.users);
      
    });
    
    this.firstname = this.SH.getItem('firstname');
    this.http.ShowPost().subscribe((data: any) => {
      this.ShowPost = data.filter((post: any) => post.approvalstatus === 1); // Filter posts with approvalstatus 1 (true)
      console.log(this.ShowPost, 'ShowPost');
    });
  }


}
