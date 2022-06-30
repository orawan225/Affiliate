import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  formCreateProduct: any;

  constructor(public callApi: CallApiService, public fb: FormBuilder, public alert: AlertService, public router: Router) {
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
      console.log(data);
      
      this.alert.success("เพิ่มสินค้าสำเร็จ")
      this.router.navigate(['/product-store'])
    }, ((err: any) => {
      if (err.status === 417) {
        this.alert.error(err.error.message)
      }
    }))
  }

}


