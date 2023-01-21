import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  Affiliate: Observable<any[]> = new Observable();
  dataSourceUser = new MatTableDataSource<any>();
  @ViewChild("paginatorUser", { read: MatPaginator }) paginatorUser!: MatPaginator;

  Store: Observable<any[]> = new Observable();
  dataSourceUser1 = new MatTableDataSource<any>();
  @ViewChild("paginatorUser1", { read: MatPaginator }) paginatorUser1!: MatPaginator;

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router,
    private ref: ChangeDetectorRef, private fb: FormBuilder,private alert: AlertService) {
      this.createPercent = fb.group({
        percent: [null],
        minimumStore: [null],
        maximumStore: [null],
        minimumAffiliate: [null],
        maxAffiliate: [null]
      })
     }

  ngOnInit(): void {
    this.getWithdrawMoney()
    this.geyMyWallet()
  }

  geyMyWallet(){
    this.callApi.myWalletAdmin().subscribe((res: any) => {
      this.wallet = res.data.income
      // console.log(this.wallet);
      
    })
  }


  getWithdrawMoney() {
    this.callApi.withdrawMoney().subscribe((res: any) => {
      this.dataSourceUser = new MatTableDataSource<any>(res);
      this.dataSourceUser.paginator = this.paginatorUser;
      this.Affiliate = this.dataSourceUser.connect();
      console.log(res);
      
    })
  }

  percentWithdrawMoney(){
    this.callApi.createPercent(this.createPercent.value).subscribe(res => {
      console.log(res);
      this.alert.success("ตั้งค่าสำเร็จ")
    })
  }

  setWithdrawId(withdrawId: any) {
    this.router.navigate(['/money'], {queryParams: {id:withdrawId}})
  }

  getUser() {
    // this.callApi.getAllUser().subscribe((data: any) => {
    //   this.dataSourceUser = new MatTableDataSource<any>(data);
    //   this.dataSourceUser.paginator = this.paginatorUser;
    //   this.user = this.dataSourceUser.connect();

    //   this.dataSourceUser1 = new MatTableDataSource<any>(data);
    //   this.dataSourceUser1.paginator = this.paginatorUser1;
    //   this.user1 = this.dataSourceUser1.connect();
    // })
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
