import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { SharedService } from '../shared.service';

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

  constructor(
    private http: RegistrationService,
    private SH: SharedService
    ) { }
  ngOnInit() {
    this.firstname = this.SH.getItem('firstname')
    this.http.ShowPost().subscribe((data: any) => {
      this.ShowPost = data
      console.log(this.ShowPost, 'ShowPost');
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
