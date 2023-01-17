import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { orderList } from 'src/app/models/order';
import { wallet } from 'src/app/models/wallet';
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

  constructor(public callApi: CallApiService, private alert: AlertService, private fb: FormBuilder,
     private cookie: CookieServiceService) {
  }

  ngOnInit(): void {
    this.getWithdraw()
  }

  getWithdraw() {
    this.callApi.getWallet().subscribe((res: any) => {
      this.wallet = res.data.Wallets
      console.log(this.wallet);
    })
  }

  // wathdrawMoney() {
  //   this.callApi.wathdrawMoney(this.store).subscribe(data => {
  //     console.log(data);
  //   }
  //   , ((err: any) => {
  //     if (err.status === 417) {
  //       this.alert.error(err.error.message)
  //     }
  //   }))

  //   this.alert.warning("ต้องการถอนเงินใช่หรือไม่ ?").then(async (result) => {
  //     if (result.isConfirmed) {
  //       await this.callApi.wathdrawMoney(this.store).subscribe(async data => {
  //         console.log(data);
  //         await this.alert.success("ทำการถอนเงินสำเร็จ")
  //         this.getWithdraw()
  //       })
  //     }
  //   })
  // }

  // getProfile() {
  //   const _auth: boolean = this.cookie.getToken() ? true : false;
  //   if (_auth) {
  //     this.callApi.getProfile().subscribe((res: any) => {
  //       this.profile = res.data.profile;
  //       this.role = res.data.profile.role;
  //     })
  //   }
  // }

}
