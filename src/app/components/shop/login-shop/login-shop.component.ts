import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login-shop',
  templateUrl: './login-shop.component.html',
  styleUrls: ['./login-shop.component.css']
})
export class LoginShopComponent implements OnInit {

  formLogin: any;
  
  constructor(public callApi: CallApiService, public fb: FormBuilder,private alert :AlertService) {
    this.formLogin = fb.group({
      storeName: [null],
      passWord: [null]
    })
  }

  ngOnInit(): void {
  }

  loginStore() {
    console.log(this.formLogin.value);
    this.callApi.loginStore(this.formLogin.value).subscribe(data => {
      this.alert.success("เข้าสู่ระบบสำเร็จ")
    },((err:any)=>{
      if (err.status===417) {
        this.alert.error(err.error.message)
      }
    }))
  }

}
