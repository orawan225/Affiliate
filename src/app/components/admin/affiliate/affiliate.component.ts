import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.css']
})
export class AffiliateComponent implements OnInit {
  
  affiliate: Array<any> = []
  affiliate2: Array<any> = []
  userName: any = []

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAfiliate()
  }

  getAfiliate() {
    this.callApi.getAllAffiliate().subscribe((data: any) => {
      this.affiliate = data
      this.affiliate2 = data
      console.log(data)
    })
  }

  searchUser(keyword: string) {
    this.affiliate = this.affiliate2.filter((data: any) => data.userName.toLowerCase().includes(keyword.toLowerCase()))
  }

  setUserId(userId: string) {
    this.router.navigate(['/update-affiliate'], { queryParams: { id: userId } })
  }
  

}
