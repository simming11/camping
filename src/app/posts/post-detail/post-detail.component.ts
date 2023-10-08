import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../../registration/registration.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  mypost: any
  post: any[] = []; 
  postid:any
  detail : any={}
  MyGuardGuard:any
  constructor(
    private route: ActivatedRoute,
    private http: RegistrationService,
    private shared: SharedService
  ) { }
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.mypost = params['mypost'];
      this.http.ShowPost().subscribe((data: any) => {
        this.post = data;
        this.detail = this.post.find(post => post.postid === this.mypost);
        console.log(this.detail);
        
      });
    });
  }

  public createImgPath = (serverPath: string) => { 
    return `https://localhost:7197/${serverPath}`; 
  }
}
