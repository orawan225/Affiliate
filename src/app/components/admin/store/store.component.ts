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
  storename: any

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStore()
  }


  getStore() {
    this.callApi.getStore().subscribe((data: any) => {
      this.store = data
      this.storename = data.store
      console.log(this.storename);
      
      console.log(data)
    })
  }

  searchUser(keyword: string) {
    this.callApi.usernameSearch(keyword).subscribe((res: any) => {
      console.log(res);
      this.store = [];
      res.forEach((element: any) => {
        this.store.push(element.user);
      });
      console.log(this.store);

    })
  }

  setUserId(userId: string) {
    this.router.navigate(['/update-store'], { queryParams: { id: userId } })
  }

}
