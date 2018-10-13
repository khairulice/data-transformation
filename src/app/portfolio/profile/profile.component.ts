import { Component, OnInit, ElementRef, Input } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../_redux/store';
import { UPDATE_NAME } from '../../_redux/actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

class Product {
    constructor(public Name) { }
}


const URL = 'http://localhost:4000/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo',authToken:`Bearer ${this.currentUser.token}`});
  public imageSrc=null;
  @select() userName;

  ngOnInit() {
	 this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
	 this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            //alert(response);
            this.imageSrc=`http://localhost:4000/${response.split('\\')[1]}`;
        };
	}

    public products: Observable<any[]>;
    constructor(db: AngularFirestore, private ngRedux: NgRedux<IAppState>, private http: HttpClient, private el: ElementRef) {
        this.products = db.collection('Product').valueChanges();
    }
    
   

	onChange() {
        this.ngRedux.dispatch({type: UPDATE_NAME, userName: this.el.nativeElement.querySelector('#userName').value});
      }
	upload() {
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        //console.log("iam+ "+inputEl);
        let fileCount: number = inputEl.files.length;
        let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('photo', inputEl.files.item(i));
            }
            this.http
                .post(URL, formData).pipe((res:any) => res).subscribe(
                    (success) => {
                     console.log(success);
                  },
                    (error) => alert(error)
                );

        }
       }
}
