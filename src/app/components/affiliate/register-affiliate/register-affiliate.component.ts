import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-affiliate',
  templateUrl: './register-affiliate.component.html',
  styleUrls: ['./register-affiliate.component.css']
})
export class RegisterAffiliateComponent implements OnInit {

  formRegister: any;
  
  constructor(public callApi: CallApiService, public fb: FormBuilder, public router: Router ) {
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
      this.router.navigate(['/loginaffiliate'])
    })
  }


}
