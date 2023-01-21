
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
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

  constructor(private callApi: CallApiService, private router: Router) {}

  ngOnInit(): void {
    this.getProduct()
    this.getProfile()
  }

  getProduct() {
    this.callApi.getAllProduct().subscribe(data => {
      this.product = data
      console.log(data)
    })
  }

  getProfile() {
      this.callApi.getProfile().subscribe((res: any) => {
        this.role = res.data.profile.role;
        console.log(this.role);
      })
  }


  setProductIdtolocal(productId : string) {
    this.router.navigate(['/product-detail'],{queryParams: {id:productId}})
  }

  searchProduct(keyword: string) {
    this.callApi.getSearchProduct(keyword).subscribe((res: any) => {
     this.product = res
      console.log(res);   
    })
  }
}
