import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: any;
  
  constructor(private callApi: CallApiService, private fb: FormBuilder,private alert :AlertService, private router: Router, private cookie: CookieServiceService) {
    this.formLogin = fb.group({
      userName: [null],
      passWord: [null]
    })
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.formLogin.value);
    this.callApi.loginUser(this.formLogin.value).subscribe((res: any) => {
      this.cookie.setToken(res.data.token)
      this.alert.success("เข้าสู่ระบบสำเร็จ")
      setTimeout(() => {
        this.router.navigate(['/home'])
      }, 1000);
    },((err:any)=>{
      if (err.status===417) {
        this.alert.error(err.error.message)
      }
    }))
    
  }

}