import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  formRegister: any
  file: any
  img: any = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'

  constructor(private callApi: CallApiService, private fb: FormBuilder, private router: Router,private http: HttpClient) {
    this.formRegister = fb.group({
      fullName: [null],
      userName: [null],
      passWord: [null],
      email: [null],
      tel: [null],
      address: [null],
      sub: [null],
      district: [null],
      province: [null],
      postalCode: [null]
    })
  }


  ngOnInit(): void {
  }

  registerUser() {
    const fileData = new FormData()
    fileData.append('file',this.file, this.file.name)
    fileData.append('profile', JSON.stringify(this.formRegister.value))
    this.callApi.registerUser(fileData).subscribe(data => {
      console.log(data);
      this.router.navigate(['/login'])
    })
   
  }

  selectFile(event: any) {
    this.file = <File>event.target.files[0]
    const image = new FileReader();
    image.readAsDataURL(this.file)
    image.onload = () => { this.img = image.result 
    console.log(this.img);
    }

  }


}

