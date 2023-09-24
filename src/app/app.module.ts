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
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { EditProfileComponent } from './navbar/edit/edit-profile/edit-profile.component';
import { PostsComponent } from './posts/posts.component';
import { MypostComponent } from './posts/mypost/mypost/mypost.component';
import { EditpostComponent } from './posts/mypost/mypost/editpost/editpost/editpost.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    FooterComponent,
    EditProfileComponent,
    PostsComponent,
    MypostComponent,
    EditpostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule

    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
