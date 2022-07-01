import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  formProduct: any
  constructor(public callApi: CallApiService, public router: Router, public fb: FormBuilder) {
    this.formProduct = fb.group({
      productId: [null],
      productName: [null],
      productPrice: [null],
      productDetail: [null]
    })
  }



  ngOnInit(): void {
    this.getProductById()

  }

  getProductById() {
    let productId = localStorage.getItem('productId')
    console.log(productId);
    
    this.callApi.getProductById(productId).subscribe(data => {
      this.formProduct = data
      console.log(this.formProduct);

    })
  }


  
}
