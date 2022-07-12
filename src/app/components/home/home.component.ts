
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

  constructor(private callApi: CallApiService, private router: Router) {}

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.callApi.getAllProduct().subscribe(data => {
      this.product = data
      console.log(data)
    })
  }

  setProductIdtolocal(productId : string) {
    // localStorage.setItem('productId',productId)
    this.router.navigate(['/product-detail'],{queryParams: {id:productId}})
  }
}
