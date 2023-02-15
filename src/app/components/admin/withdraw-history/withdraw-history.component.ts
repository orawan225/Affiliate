import { Component, OnInit, ViewChild } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';
import { withdraw } from 'src/app/models/withdraw';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-withdraw-history',
  templateUrl: './withdraw-history.component.html',
  styleUrls: ['./withdraw-history.component.css']
})
export class WithdrawHistoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  withdraw: any = []
  api = environment.apiUrl


  affiliate: Observable<any[]> = new Observable();
  dataSourceAffiliate = new MatTableDataSource<any>();
  @ViewChild("paginatorAffiliate", { read: MatPaginator }) paginatorAffiliate!: MatPaginator;

  store: Observable<any[]> = new Observable();
  dataSourceStore = new MatTableDataSource<any>();
  @ViewChild("paginatorStore", { read: MatPaginator }) paginatorStore!: MatPaginator;

  constructor(private callApi: CallApiService) { }

  ngOnInit(): void {
    this.showStatusWithdraw()
  }
  
  showStatusWithdraw() {
    this.callApi.showStatusWithdraw().subscribe((res: any) => {
      const _wid: Array<withdraw> = res;
      //console.log(_wid);

      this.dataSourceAffiliate = new MatTableDataSource<any>(_wid.filter(x => x.withdrawType == 'affiliate'));
      this.dataSourceAffiliate.paginator = this.paginatorAffiliate;
      this.affiliate = this.dataSourceAffiliate.connect();

      this.dataSourceStore = new MatTableDataSource<any>(_wid.filter(x => x.withdrawType == 'store'));
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

}
