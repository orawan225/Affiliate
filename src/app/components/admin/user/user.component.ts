import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { UpdateUserComponent } from '../update/update-user/update-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any = []
  userName: any

  constructor(private callApi: CallApiService, private cookie: CookieServiceService, private router: Router,
    ) { }

  ngOnInit(): void {
    this. getUser()
  }

  getUser() {
    this.callApi.getAllUser().subscribe(data => {
      this.user = data
      console.log(data)
    })
  }

  userNameSearch(keyword: string) {
    this.callApi.usernameSearch(keyword).subscribe((res: any) => {
     this.userName = res
      console.log(res);   
    })
  }

  setUserId(userId : string) {
    this.router.navigate(['/update-user'],{queryParams: {id:userId}})
  }

}
