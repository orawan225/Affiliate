import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { CallApiService } from 'src/app/services/call-api.service';
import Swal from 'sweetalert2';



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
    this.callApi.getProductById(productId).subscribe(data => {
      // this.formProduct = data
      this.patchValue(data)
      console.log(this.formProduct);

    })
  }

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
        this.router.navigate(['/productdetail'])
      }, 1000);
    })
  }

  // openDialog() {
  //   this.dialog.open(EditProdructComponent, {
  //     data: {
  //       animal: 'panda',
  //     },
  //   });
  // }



}
