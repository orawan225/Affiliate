import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-affiliate',
  templateUrl: './login-affiliate.component.html',
  styleUrls: ['./login-affiliate.component.css']
})
export class LoginAffiliateComponent implements OnInit {

  formLogin: any;
  
  constructor(public callApi: CallApiService, public fb: FormBuilder,private alert :AlertService, private cookie: CookieServiceService, public router: Router) {
    this.formLogin = fb.group({
      userName: [null],
      passWord: [null]
    })
  }

  ngOnInit(): void {
  }

  loginUser() {
    console.log(this.formLogin.value);
    this.callApi.loginUser(this.formLogin.value).subscribe((res: any) => {
      this.cookie.setToken(res.data.token)
      this.alert.success("เข้าสู่ระบบสำเร็จ")
      this.router.navigate(['/home'])
    },((err:any)=>{
      if (err.status===417) {
        this.alert.error(err.error.message)
      }
    }))
  }

  // profile() {
  //   this.callApi.getProfile().subscribe((res: any) => {
  //     console.log(res);  
  //   })
  // }

}
