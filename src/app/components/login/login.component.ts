import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: any;
  submitAdd: boolean = false;
  profile: any
  api = environment.apiUrl

  constructor(private callApi: CallApiService, private fb: FormBuilder, private alert: AlertService, private router: Router, private cookie: CookieServiceService) {
    this.formLogin = fb.group({
      userName: [null, [Validators.required]],
      passWord: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getProfileAdmin()
  }

  get formValidAdd() {
    return this.formLogin.controls;
  }

  onChange() {
    this.submitAdd = false
  }

  getProfileAdmin() {
    this.callApi.getProfileAdmins().subscribe(res => {
      this.profile = res
      // console.log(res);
    })
  }


  login() {
    if (this.formLogin.value.userName == "" || this.formLogin.value.userName == null) {
      this.submitAdd = true;
    } 
    this.callApi.loginUser(this.formLogin.value).subscribe((res: any) => {
      this.cookie.setToken(res.data.token)
      let role: string = this.cookie.helper$.decodeToken(res.data.token).role
      this.cookie.setRoleAccount(role.trim())
      this.alert.success("เข้าสู่ระบบสำเร็จ")
      setTimeout(() => {
        if (role.toUpperCase().trim() == "ADMIN".toUpperCase().trim()) {
          this.router.navigate(['/dashboard'])
        } else {
          this.router.navigate(['/home'])
        }
      }, 1000);
    }, ((err: any) => {
      if (err.status === 417) {
        this.alert.error("เข้าสู่ระบบไม่สำเร็จ")
      }
    }))

  }

}