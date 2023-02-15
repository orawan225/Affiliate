
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { CookieServiceService } from 'src/app/services/cookie-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  product: any = []
  api = environment.apiUrl
  role?: string
  showCardRole: any

  constructor(private callApi: CallApiService, private router: Router,private cookie: CookieServiceService) {}

  ngOnInit(): void {
    this.getProduct()
    this.getRoleProfile()
  }

  getProduct() {
    this.callApi.getAllProduct().subscribe(data => {
      this.product = data
      //console.log(data)
    })
  }

  getRoleProfile() {
    if (this.cookie.getRoleAccount()) {
      this.showCardRole = this.cookie.getRoleAccount()
      //console.log(this.showCardRole); 
    }
  }

  setProductIdtolocal(productId : string) {
    this.router.navigate(['/product-detail'],{queryParams: {id:productId}})
  }

  searchProduct(keyword: string) {
    this.callApi.getSearchProduct(keyword).subscribe((res: any) => {
     this.product = res
      //console.log(res);   
    })
  }
}
