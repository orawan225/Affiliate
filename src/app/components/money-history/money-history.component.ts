import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-money-history',
  templateUrl: './money-history.component.html',
  styleUrls: ['./money-history.component.css']
})
export class MoneyHistoryComponent implements OnInit {

  wallet: any
  role?: string
  profile: any
  store: any = []
  formWithdraw: any
  percent: any
  ordertList: any
  api = environment.apiUrl
  totalPrice: any

  get perPlusWithdraw() {
    return (this.formWithdraw.value.withdraw*1) + ((this.formWithdraw.value.withdraw * this.percent) / 100)
  }

  constructor(public callApi: CallApiService, private alert: AlertService, private fb: FormBuilder,
    private cookie: CookieServiceService) {
    this.formWithdraw = fb.group({
      withdraw: [null]
    })
    this.store = cookie.getUserId();
  }

  ngOnInit(): void {
    this.getWithdraw()
    this.getProfile()
    this.getconfig()
  }


  getconfig() {
    this.callApi.getconfig().subscribe((res: any) => {
      this.percent = res.percent
      console.log(this.percent);
    })
  }

  getWithdraw() {
    this.callApi.getWallet().subscribe((res: any) => {
      this.wallet = res.data.Wallets
      console.log(this.wallet);
    })
  }



  wathdrawMoneyStore() {
    this.callApi.wathdrawMoney(this.formWithdraw.value.withdraw).subscribe(res => {
      this.alert.success("ทำการถอนเงินสำเร็จ")
      this.getWithdraw()
    }, ((err: any) => {
      if (err.status === 417) {
        this.alert.warning(err.error.message)
      }
    })
    )
  }


  wathdrawMoneyAffiliate() {
    this.callApi.wathdrawMoneyAffiliate(this.formWithdraw.value.withdraw).subscribe(res => {
      this.alert.success("ทำการถอนเงินสำเร็จ")
    }, ((err: any) => {
      if (err.status === 417) {
        this.alert.warning(err.error.message)
      }
    })
    )
  }

  getProfile() {
    const _auth: boolean = this.cookie.getToken() ? true : false;
    if (_auth) {
      this.callApi.getProfile().subscribe((res: any) => {
        this.profile = res.data.profile;
        this.role = res.data.profile.role;
        console.log(this.role);

      })
    }
  }

}
