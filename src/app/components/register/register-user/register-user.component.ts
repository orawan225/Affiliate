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
  
  constructor(public callApi: CallApiService, public fb: FormBuilder, public router: Router) {
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
    console.log(this.formRegister.value);
    this.callApi.registerUser(this.formRegister.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['/login'])
    })
  }


}

