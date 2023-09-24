
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { RegistrationService } from 'src/app/registration/registration.service';
import { SharedService } from 'src/app/shared.service';
import { Guid } from 'guid-typescript';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
export class Registration {
  username!: string | null;
  password!: string | null;
  email!: string | null;
  role!: string | null;
  firstname!: string | null;
  lastname!: string | null;
  phonenumber!: string | null;
  dateofbirth!: null;
  avatar ! :string
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {
  data: any
  sesStr: any
  registrationForm!: FormGroup;
  userData: Registration = new Registration();
  users: any[] = []; 
  getdataUser : any
  constructor(
    private authService: AuthService,
    private router: Router,
    private servince: RegistrationService,
    private SH: SharedService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: RegistrationService
  ) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sesStr = params['sesStr'];
      console.log(this.sesStr,'sssertr');
      
      this.http.ShowUser().subscribe((data: any) => {
        this.users = data;
    
        // Use the Array.find method to search for an object with matching firstname
        const foundUser = this.users.find(user => user.firstname === this.sesStr);
    
        if (foundUser) {
           this.getdataUser= this.SH.getItem('user');
          console.log( this.getdataUser,'userdata1111');
          

          this.registrationForm.patchValue(this.getdataUser);
          console.log(this.registrationForm.patchValue(this.getdataUser),'path');
          
  
          console.log('Found a user with firstname:', foundUser.firstname);
          // Perform your action here when a matching user is found
        } else {
          console.log('No user with firstname matching:', this.sesStr);
          // Perform an action when no matching user is found
        }
      });
    });
    
    this.createRegistrationForm()
  }
  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      avatar : '',
      firstname: '',
      lastname: '', 
      phonenumber: '', 
      dateofbirth: null,
    });
  }
   onSubmit() {
  //   if (this.registrationForm.valid) {
  //     const registrationData: Registration = this.registrationForm.value;
  //     console.log(registrationData, "value");
  
  //     // Pass the username from route parameters and registrationData to editData
  //     this.servince.editData(this.sesStr, registrationData).subscribe(
  //       (res: any) => {
  //         Swal.fire(
  //           'แก้ไขสำเร็จ',
  //           '',
  //           'success'
  //         )
  //       },
  //       (error: any) => {
  //         console.error("เกิดข้อผิดพลาด", error);
  //       }
  //     );
  //     this.router.navigate(['home']);
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'กรุณากรอกให้ถูกต้อง!',
  //     })
  //     console.log('กรุณากรอกข้อมูลให้ถูกต้อง');
  //   }
   }
}