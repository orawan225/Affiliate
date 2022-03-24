import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-login-affiliate',
  templateUrl: './login-affiliate.component.html',
  styleUrls: ['./login-affiliate.component.css']
})
export class LoginAffiliateComponent implements OnInit {

  formLogin: any;
  
  constructor(public callApi: CallApiService, public fb: FormBuilder,private alert :AlertService) {
    this.formLogin = fb.group({
      userName: [null],
      passWord: [null]
    })
  }

  ngOnInit(): void {
  }

  loginUser() {
    console.log(this.formLogin.value);
    this.callApi.loginUser(this.formLogin.value).subscribe(data => {
      this.alert.success("เข้าสู่ระบบสำเร็จ")
    },((err:any)=>{
      if (err.status===417) {
        this.alert.error(err.error.message)
      }
    }))
  }

}
