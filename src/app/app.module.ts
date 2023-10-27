import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './form-page/form-page.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import {  ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { PostsComponent } from './posts/posts.component';
import { MypostComponent } from './posts/mypost/mypost/mypost.component';
import { EditpostComponent } from './posts/mypost/mypost/editpost/editpost/editpost.component';
import { AdminComponent } from './admin/admin.component';
import { NavbarAdminComponent } from './admin/navbar-admin/navbar-admin.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { ApprovalstatusComponent } from './admin/approvalstatus/approvalstatus/approvalstatus.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { UploadComponent } from './upload/upload.component';
import {MatCardModule} from '@angular/material/card';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './navbar/edit/edit-profile/edit-profile.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserComponent } from './admin/user/user/user.component';
import { ViewPostComponent } from './admin/post/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    FooterComponent,
    PostsComponent,
    MypostComponent,
    EditpostComponent,
    AdminComponent,
    NavbarAdminComponent,
    NavbarUserComponent,
    ApprovalstatusComponent,
    UploadComponent,
    PostDetailComponent,
    NotFoundComponent,
    EditProfileComponent,
    UserComponent,
    ViewPostComponent

  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatExpansionModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
    
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
