import { NgModule } from '@angular/core';
import { LoginComponent } from './form-page/form-page.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { EditProfileComponent } from './navbar/edit/edit-profile/edit-profile.component';
import { PostsComponent } from './posts/posts.component';
import { MypostComponent } from './posts/mypost/mypost/mypost.component';
import { EditpostComponent } from './posts/mypost/mypost/editpost/editpost/editpost.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';
import { ApprovalstatusComponent } from './admin/approvalstatus/approvalstatus/approvalstatus.component';
import { UploadComponent } from './upload/upload.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { MyGuardGuard } from './my-guard.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // เพิ่มเส้นทางว่าง (empty path) ที่จะเปลี่ยนเส้นทางไปยัง '/home'
  { path: 'home', component: HomeComponent},
  { path: 'form', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'edit/:userid', component: EditProfileComponent},
  { path: 'post', component: PostsComponent ,canActivate: [MyGuardGuard]},
  { path: 'Mypost', component: MypostComponent ,canActivate: [MyGuardGuard]},
  { path: 'post/:mypost', component: EditpostComponent ,canActivate: [MyGuardGuard] },
  { path: 'Approvalstatus', component: ApprovalstatusComponent ,canActivate: [AdminGuard] },
  { path: 'upload', component: UploadComponent},
  { path: 'PostDetail/:mypost', component: PostDetailComponent },
  { path: 'admin', component: AdminComponent},
  {
    path: 'adminprotected',
    component: LoginComponent,
    canActivate: [AdminGuard] // Protect this route with the AdminGuard
  },
  {
    path: 'protected',
    component: LoginComponent,
    canActivate: [MyGuardGuard]
  },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
