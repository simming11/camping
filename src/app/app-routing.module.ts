import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './form-page/form-page.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { EditProfileComponent } from './navbar/edit/edit-profile/edit-profile.component';
import { PostsComponent } from './posts/posts.component';
import { MypostComponent } from './posts/mypost/mypost/mypost.component';
import { EditpostComponent } from './posts/mypost/mypost/editpost/editpost/editpost.component';


const routes: Routes = [
  {path :'home',component:HomeComponent},
  {path :'form',component:LoginComponent},
  {path :'register',component:RegistrationComponent},
  {path :'edit/:sesStr',component:EditProfileComponent},
  {path :'post',component:PostsComponent},
  {path: 'Mypost',component:MypostComponent},
  {path:'post/:mypost',component:EditpostComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
