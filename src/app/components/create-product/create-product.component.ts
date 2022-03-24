import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/services/call-api.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  formCreateProduct: any;

  constructor(public callApi: CallApiService, public fb: FormBuilder, public alert: AlertService) {
    this.formCreateProduct = fb.group({
      productName: [null],
      productDetail: [null],
      productPrice: [null]
    })
  }

  ngOnInit(): void {
  }

  createProduct() {
    console.log(this.formCreateProduct.value);
    this.callApi.createProduct(this.formCreateProduct.value).subscribe(data => {
      this.alert.success("เพิ่มสินค้าสำเร็จ")
    }, ((err: any) => {
      if (err.status === 417) {
        this.alert.error(err.error.message)
      }
    }))
  }
}


