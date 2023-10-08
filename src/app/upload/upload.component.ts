import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  progress!: number;
  message!: string;
  imageUrl: string | undefined;
  isImageDisplayed: boolean = false; // เพิ่มตัวแปร isImageDisplayed

  @Output() public onUploadFinished = new EventEmitter();
  @Output() public imageUrlChanged = new EventEmitter<string>();
  @Input() buttonText: string = 'Choose File';
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }
  

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('https://localhost:7197/api/Camp', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.imageUrl = URL.createObjectURL(fileToUpload);
            this.isImageDisplayed = true; // ตั้งค่า isImageDisplayed เมื่อรูปภาพถูกแสดง
            this.onUploadFinished.emit(event.body);
            this.imageUrlChanged.emit(this.imageUrl);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }
  

  closeImage() {
    // รีเซ็ตค่า imageUrl และ isImageDisplayed เมื่อปุ่ม "Close" ถูกคลิก
    this.imageUrl = undefined;
    this.isImageDisplayed = false;
  }
}
