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
  affiliate: any = []
  // userName: any = []

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAfiliate()
  }

  getAfiliate() {
    this.callApi.getAllAffiliate().subscribe(data => {
      this.affiliate = data
      console.log(data)
    })
  }

  searchUser(keyword: string) {
    this.callApi.usernameSearch(keyword).subscribe((res: any) => {
      console.log(res);
      // this.user = res.user
      this.affiliate = [];
      res.forEach((element: any) => {
        this.affiliate.push(element.affiliate);
      });
      console.log(this.affiliate);

    })
  }

  setUserId(userId: string) {
    this.router.navigate(['/update-affiliate'], { queryParams: { id: userId } })
  }
  

}
