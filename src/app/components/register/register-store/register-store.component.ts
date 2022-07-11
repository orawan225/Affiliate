import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.css']
})
export class RegisterStoreComponent implements OnInit {

  formRegister: any;
  checkLogin: boolean = true
  file: any
  img: any = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'

  constructor(private callApi: CallApiService, private fb: FormBuilder, private router: Router, private cookie: CookieServiceService) {
    this.formRegister = fb.group({
      store: [null],
      bankNameAccount: [null],
      bankNumber: [null],
      bankName: [null]
    })
  }

  ngOnInit(): void {
  }

  registerStore() {
    const fileData = new FormData()
    fileData.append('file', this.file, this.file.name)
    fileData.append('profile', JSON.stringify(this.formRegister.value))
    console.log(this.formRegister.value);
    this.callApi.registerStore(fileData).subscribe((res: any) => {
      console.log(res);
      if (this.cookie.getToken()) {
        this.checkLogin = true
        this.router.navigate(['/home'])
      } else {
        this.checkLogin = false
        this.router.navigate(['/login'])
      }
    })
  }

  selectFile(event: any) {
    this.file = <File>event.target.files[0]
    const image = new FileReader();
    image.readAsDataURL(this.file)
    image.onload = () => {
      this.img = image.result
      console.log(this.img);
    }
  }

}