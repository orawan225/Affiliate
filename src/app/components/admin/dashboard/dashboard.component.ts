import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['fullName'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  profile: any = []
  role?: string
  checkLogin: boolean = true
  showCardRole: any
  user: any = []
  date: Date = new Date()

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getUser()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUser() {
    this.callApi.getAllUser().subscribe((data: any) => {
      // this.user = data
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      console.log(data)
    })
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

export interface PeriodicElement {
  fullName: string;

}
