import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any

  constructor(private callApi: CallApiService, private router: Router) {}

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.callApi.getAllProduct().subscribe(data => {
      this.products = data
      console.log(data)
    })
  }

  setProductIdtolocal(productId : string) {
    localStorage.setItem('productId',productId)
    this.router.navigate(['/product-detail'])
  }
}
