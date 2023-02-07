import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  store: any = []
  user: any

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStore()
  }


  getStore() {
    this.callApi.getStore().subscribe(data => {
      this.store = data
      console.log(data)
    })
  }

  userNameSearch(keyword: string) {
    this.callApi.usernameSearch(keyword).subscribe((res: any) => {
     this.user = res
      console.log(res);   
    })
  }


}
