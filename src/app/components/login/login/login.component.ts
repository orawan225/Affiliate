import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
  
  constructor(public callApi: CallApiService, public fb: FormBuilder,private alert :AlertService, public router: Router, public cookie: CookieServiceService) {
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
      this.router.navigate(['/check-login'])
    },((err:any)=>{
      if (err.status===417) {
        this.alert.error(err.error.message)
      }
    }))
    
  }
}
