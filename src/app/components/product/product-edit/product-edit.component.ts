import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { CallApiService } from 'src/app/services/call-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  formProduct: any
  constructor(public callApi: CallApiService, public router: Router, public fb: FormBuilder) {
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
    // this.getProductById()

  }

  // getProductById() {
  //   let productId = localStorage.getItem('productId')
  //   this.callApi.getAllProduct().subscribe(data => {
  //     // this.formProduct = data
  //     this.patchValue(data)
  //     console.log(this.formProduct);

  //   })
  // }

  editProductById(propuctId: string) {
    this.callApi.editProductById(propuctId,this.formProduct.value).subscribe(data => {
      console.log(data);
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'แก้ไขสำเร็จ',
        showConfirmButton: false,
        timer: 1000
      })
      setTimeout(() => {
        this.router.navigate(['/product-store'])
      }, 1000);
    })
  }


}
