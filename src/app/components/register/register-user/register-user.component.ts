import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  formRegister: any

  constructor(private callApi: CallApiService, private fb: FormBuilder, private router: Router, private http: HttpClient,
    private alert: AlertService) {
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
    this.callApi.registerUser(this.formRegister.value).subscribe(async (data) => {
      console.log(data);
      await this.alert.success("สมัครสมาชิกสำเร็จ")
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 1000);
    }, ((err: any) => {
      if (err.status === 417) {
        this.alert.error(err.error.message)
      }
    }))

  }

}

