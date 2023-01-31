import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';
import { withdraw } from 'src/app/models/withdraw';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-money-history',
  templateUrl: './money-history.component.html',
  styleUrls: ['./money-history.component.css']
})
export class MoneyHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  wallet: any
  role?: string
  profile: any
  // store: any = []
  formWithdraw: any
  percent: any
  api = environment.apiUrl
  totalPrice: any
  wathdrawMoneyHistory: any

  get perPlusWithdraw() {
    return (this.formWithdraw.value.withdraw*1) + ((this.formWithdraw.value.withdraw * this.percent) / 100)
  }

  affiliate: Observable<any[]> = new Observable();
  dataSourceAffiliate = new MatTableDataSource<any>();
  @ViewChild("paginatorAffiliate", { read: MatPaginator }) paginatorAffiliate!: MatPaginator;

  store: Observable<any[]> = new Observable();
  dataSourceStore = new MatTableDataSource<any>();
  @ViewChild("paginatorStore", { read: MatPaginator }) paginatorStore!: MatPaginator;

  constructor(public callApi: CallApiService, private alert: AlertService, private fb: FormBuilder,
    private cookie: CookieServiceService) {
    this.formWithdraw = fb.group({
      withdraw: [null]
    })
  }

  ngOnInit(): void {
    this.getWithdraw()
    this.getProfile()
    this.getconfig()
    this.getWathdrawMoneyHistory()
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
    })
  }
  
  getWathdrawMoneyHistory() {
    this.callApi.wathdrawMoneyHistory().subscribe((res: any) => {
      const withdrawMoney: Array<withdraw> = res;
      console.log(withdrawMoney);

      this.dataSourceAffiliate = new MatTableDataSource<any>(withdrawMoney.filter(x => x.withdrawType == 'affiliate'));
      this.dataSourceAffiliate.paginator = this.paginatorAffiliate;
      this.affiliate = this.dataSourceAffiliate.connect();

      this.dataSourceStore = new MatTableDataSource<any>(withdrawMoney.filter(x => x.withdrawType == 'store'));
      this.dataSourceStore.paginator = this.paginatorStore;
      this.store = this.dataSourceStore.connect();
    })
  }

  getRowAF(index: number): number {
    return (index + 1) + (this.paginatorAffiliate.pageSize * this.paginatorAffiliate.pageIndex);
  }

  getRowST(index: number): number {
    return (index + 1) + (this.paginatorStore.pageSize * this.paginatorStore.pageIndex);
  }



  wathdrawMoneyStore() {
    this.callApi.wathdrawMoney(this.formWithdraw.value.withdraw).subscribe( res => {
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
      this.getWithdraw()
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
