import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-withdraw-history',
  templateUrl: './withdraw-history.component.html',
  styleUrls: ['./withdraw-history.component.css']
})
export class WithdrawHistoryComponent implements OnInit {

  withdraw: any = []
  api = environment.apiUrl

  constructor(private callApi: CallApiService) { }

  ngOnInit(): void {
    this.showStatusWithdraw()
  }


  showStatusWithdraw() {
    this.callApi.showStatusWithdraw().subscribe(res => {
      this.withdraw = res
      console.log(res);
      
    })
  }

}
