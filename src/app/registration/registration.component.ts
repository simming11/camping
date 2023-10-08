import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';





export class User {
  userid!: string;
  username!: string | null;
  password!: string | null;
  email!: string | null;
  role!: string | null;
  firstname!: string | null;
  lastname!: string | null;
  phonenumber!: string | null;
  dateofbirth!: null;
  images!: string
  public response!: { dbPath: '' }
  registrationData: any
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForms!: FormGroup;
  userData: User = new User();
  response: any;
  progress!: number;
  message!: string;
  imageUrl: string | undefined;
  isImageDisplayed: boolean = false; // เพิ่มตัวแปร isImageDisplayed
  subscription: Subscription | undefined;


  constructor(
    private fb: FormBuilder,
    private service: RegistrationService,
    private router: Router,
    private SH: SharedService,
    private authService: AuthService
  ) {
    this.createRegistrationForm();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // ngOnInit(): void {
  //   this.createRegistrationForm();

  //   // Subscribe to form value changes
  //   this.subscription = this.registrationForms.valueChanges.subscribe((formData) => {
  //     localStorage.setItem('registrationData', JSON.stringify(formData));
  //   });

  //   // Fetch data from Local Storage and populate the form if available
  //   const savedData = localStorage.getItem('registrationData');
  //   if (savedData) {
  //     const registrationData = JSON.parse(savedData);
  //     this.registrationForms.setValue(registrationData);
  //   }
  // }

  public updateImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  createRegistrationForm() {
    this.registrationForms = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      images: '',
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phonenumber: ['', Validators.required],
      role: 'user',
      dateofbirth: null,
    });
  }



  public onUploadFinished = (event: any) => {
    this.response = event;
    console.log(this.response);

    // Assign this.response.dbPath to the images field
    if (this.response && this.response.dbPath) {
      this.registrationForms.patchValue({
        images: this.response.dbPath
      });
    }
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:7197/${serverPath}`;
  }



  // onSubmit() {
  //   if (this.registrationForms.valid) {
  //     const registrationData: User = this.registrationForms.value;
  //     console.log(registrationData, "value");
  //     const requestBody = JSON.stringify(registrationData); 

  //     this.service.getuser(requestBody).subscribe(
  //       (res: any) => {
  //         console.log("สำเร็จ");
  //         console.log(res, 'res');
  //         this.SH.setItem('firstname', registrationData.firstname);
  //         this.SH.setItem('user', registrationData);
  //         this.SH.setItem('role', registrationData.role);
  //         this.SH.setItem('images', registrationData.images);

  //         // Remove the data from Local Storage
  //         localStorage.removeItem('registrationData');

  //         // Reset the form
  //         this.registrationForms.reset();

  //         // Call the login method here to automatically log in the user after registration
  //         this.authService.login(); 

  //         this.router.navigate(['/form']);
  //       },
  //       (error: any) => {
  //         console.error("เกิดข้อผิดพลาด", error);
  //       }
  //     );
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'กรุณากรอกให้ถูกต้อง!',
  //     });
  //     console.log('กรุณากรอกข้อมูลให้ถูกต้อง');
  //   }
  // }

  onSubmit() {
    if (this.registrationForms.valid == false) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'กรุณาใส่ข้อมูลให้ครบ',
      });

    }
    else {



      // Iterate over each form control to check validity, dirty state, and required
      Object.keys(this.registrationForms.controls).forEach(key => {
        const control = this.registrationForms.get(key);

        if (control && control.invalid && (control.dirty || control.touched)) {
          if (control.hasError('required')) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${key.charAt(0).toUpperCase() + key.slice(1)} is required!`,
            });
          }
        }
      });

      if (this.registrationForms.valid) {
        const registrationData: User = this.registrationForms.value;
        console.log(registrationData, "value");
        const requestBody = JSON.stringify(registrationData);

        // this.service.getuser(requestBody).subscribe(
        //   (res: any) => {
        //     console.log("สำเร็จ");
        //     console.log(res, 'res');
        //     this.SH.setItem('firstname', registrationData.firstname);
        //     this.SH.setItem('user', registrationData);
        //     this.SH.setItem('role', registrationData.role);
        //     this.SH.setItem('images', registrationData.images);

        //     // Remove the data from Local Storage
        //     localStorage.removeItem('registrationData');

        //     // Reset the form
        //     this.registrationForms.reset();

        //     // Call the login method here to automatically log in the user after registration
        //     this.authService.login(); 

        //     this.router.navigate(['/form']);
        //   },
        //   (error: any) => {
        //     console.error("เกิดข้อผิดพลาด", error);
        //   }
        // );
      }
    }
  }

}
