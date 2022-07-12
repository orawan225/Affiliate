import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  formProduct: any
  api = environment.apiUrl
  product: any = []

  constructor(private callApi: CallApiService, private router: Router, private fb: FormBuilder, private alert: AlertService) {
    this.formProduct = fb.group({
      productId: [null],
      productName: [null],
      productPrice: [null],
      productDetail: [null]
    })
  }

  patchValue(receiveProduct: product) {
    this.formProduct.patchValue({
      productId: receiveProduct.productId,
      productName: receiveProduct.productName,
      productPrice: receiveProduct.productPrice,
      productDetail: receiveProduct.productDetail,
    })
  }


  ngOnInit(): void {
    this.getProductById()

  }

  getProductById() {
    let productId = localStorage.getItem('productId')
    this.callApi.getProductById(productId).subscribe(res => {
      this.product = res
      this.patchValue(res)      
      console.log(this.formProduct);
    })
  }

  editProductById(propuctId: string) {
    this.callApi.editProductById(propuctId, this.formProduct.value).subscribe(data => {
      console.log(data);
      this.alert.success("แก้ไขสำเร็จ")
        setTimeout(() => {
          this.router.navigate(['/product-store'])
        }, 1000);
    })
  }


}
