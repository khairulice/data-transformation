import { Component, OnInit, ElementRef, Input } from '@angular/core';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
const URL = 'http://localhost:4000/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  title = 'app works!';

  ngOnInit() {
	 this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
	 this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            alert(response);
        };
	}

	constructor(private http: HttpClient, private el: ElementRef) {}
	
	upload() {
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        console.log("iam+ "+inputEl);
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('photo', inputEl.files.item(i));
            }
            this.http
                .post(URL, formData).pipe((res:any) => res).subscribe(
                    (success) => {
                     alert(success);
                  },
                    (error) => alert(error)
                );

        }
       }
}
