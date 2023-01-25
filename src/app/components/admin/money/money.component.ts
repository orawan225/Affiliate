import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {

  file: any
  img: any = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
  withdrawId: any
  withdraw: any
  totalPrice: any
  withholdMoney: any
  bankName: string = ''
  bankNameAccount: any
  bankNumber: any
  store: any
  fullName: any
  profile: any = {}
  tel: string = ''
  withdrawType: string = ''


  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router,
    private acrout: ActivatedRoute, private alert: AlertService) {

    acrout.queryParams.subscribe((res: any) => {
      this.withdrawId = res.id
    })
  }

  ngOnInit(): void {
    this.getWiithdrawById()
  }


  getWiithdrawById() {
    this.callApi.getWithdrawById(this.withdrawId).subscribe((res: any) => {
      this.profile = res.withdrawType == 'affiliate' ? res.affiliate : res.store
      this.withdrawType = res.withdrawType
      this.withdraw = res
      this.totalPrice = res.totalPrice
      this.withholdMoney = res.withholdMoney
      this.withholdMoney = res.withholdMoney
      this.fullName = res.user.fullName
      this.tel = res.user.tel
      // this.store = res.store.store
      // this.bankName = res.store.bankName
      // this.bankNameAccount = res.store.bankNameAccount 
      // this.bankNumber = res.store.bankNumber 
      console.log(this.withdraw);
    })
  }

  createWithdraw() {
    let fileData = new FormData()
    fileData.append('file', this.file)
    this.callApi.updateOrderWithdraw(this.withdrawId, fileData).subscribe((res: any) => {
      this.alert.success("โอนเงินสำเร็จ")
      setTimeout(() => {
        this.router.navigate(['/dashboard'])
      }, 1000);
    })
  }

  selectFile(event: any) {
    this.file = <File>event.target.files[0]
    const image = new FileReader();
    image.readAsDataURL(this.file)
    image.onload = () => {
      this.img = image.result
    }
  }

}
