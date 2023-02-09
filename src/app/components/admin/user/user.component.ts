import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: Array<any> = []
  user2: Array<any> = []
  userName: any = []

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    this.callApi.getAllUser().subscribe((data: any) => {
      this.user = data
      this.user2 = data
      console.log(data)
    })
  }

  searchUser(keyword: string) {
    this.user = this.user2.filter((data: any) => data.userName.toLowerCase().includes(keyword.toLowerCase()))
  }

  setUserId(userId: string) {
    this.router.navigate(['/update-user'], { queryParams: { id: userId } })
  }

}
