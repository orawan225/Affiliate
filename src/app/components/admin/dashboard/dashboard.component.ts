import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Config } from '@fortawesome/fontawesome-svg-core';
import { Observable } from 'rxjs';
import { configSystem } from 'src/app/models/configSystem';
import { withdraw } from 'src/app/models/withdraw';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  profile: any = []
  role?: string
  checkLogin: boolean = true
  showCardRole: any
  date: Date = new Date()
  createPercent: any
  wallet: any
  percent: any
  minStore: any
  maxStore: any
  minAffiliate: any
  maxAffiliate: any
  config: any

  affiliate: Observable<any[]> = new Observable();
  dataSourceAffiliate = new MatTableDataSource<any>();
  @ViewChild("paginatorAffiliate", { read: MatPaginator }) paginatorAffiliate!: MatPaginator;

  store: Observable<any[]> = new Observable();
  dataSourceStore = new MatTableDataSource<any>();
  @ViewChild("paginatorStore", { read: MatPaginator }) paginatorStore!: MatPaginator;

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router,
    private ref: ChangeDetectorRef, private fb: FormBuilder, private alert: AlertService) {
    this.createPercent = fb.group({
      percent: [null],
      minimumStore: [null],
      maximumStore: [null],
      minimumAffiliate: [null],
      maxAffiliate: [null]
    })
    
  }

  patchValue(receiveConfig: configSystem) {
    this.createPercent.patchValue({
      percent: receiveConfig.percent,
      minimumStore: receiveConfig.minStore,
      maximumStore: receiveConfig.maxStore,
      minimumAffiliate: receiveConfig.minAffiliate,
      maxAffiliate: receiveConfig.maxAffiliate
    })

  }

  ngOnInit(): void {
    this.getWithdrawMoney()
    this.geyMyWallet()
    this.getConfig()
  }

  geyMyWallet() {
    this.callApi.myWalletAdmin().subscribe((res: any) => {
      this.wallet = res.data.income
    })
  }

  getConfig() {
    this.callApi.getconfig().subscribe((res: any) => {
      this.config = res
      console.log(res);
      this.percent = res.percent
      this.minStore = res.minStore
      this.maxStore = res.maxStore
      this.minAffiliate = res.minAffiliate
      this.maxAffiliate = res.maxAffiliate
      this.patchValue(res)
    })
  }

  percentWithdrawMoney() {
    this.callApi.createPercent(this.createPercent.value).subscribe(res => {
      console.log(res);
      this.alert.success("ตั้งค่าสำเร็จ")

      setTimeout(() => {
        this.getConfig()
      }, 1000);
      
    })
  }


  getWithdrawMoney() {
    this.callApi.withdrawMoney().subscribe((res: any) => {
      const withdraw: Array<withdraw> = res;
      console.log(withdraw);

      this.dataSourceAffiliate = new MatTableDataSource<any>(withdraw.filter(x => x.withdrawType == 'affiliate'));
      this.dataSourceAffiliate.paginator = this.paginatorAffiliate;
      this.affiliate = this.dataSourceAffiliate.connect();

      this.dataSourceStore = new MatTableDataSource<any>(withdraw.filter(x => x.withdrawType == 'store'));
      this.dataSourceStore.paginator = this.paginatorStore;
      this.store = this.dataSourceStore.connect();
    })
  }

  setwithdrawId(withdrawId: string) {
    this.router.navigate(['/money'], { queryParams: { id: withdrawId } })
  }

  getRowAF(index: number): number {
    return (index + 1) + (this.paginatorAffiliate.pageSize * this.paginatorAffiliate.pageIndex);
  }

  getRowST(index: number): number {
    return (index + 1) + (this.paginatorStore.pageSize * this.paginatorStore.pageIndex);
  }

  getRoleProfile() {
    if (this.cookie.getRoleAccount()) {
      this.showCardRole = this.cookie.getRoleAccount()
    }
  }

  ngAfterContentChecked() {
    this.ref.detectChanges()
  }

}
