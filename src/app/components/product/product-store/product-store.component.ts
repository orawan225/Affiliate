import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css']
})
export class ProductStoreComponent implements OnInit {

  products: any
  formProduct: any
  api = environment.apiUrl
  
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
    this.getAllProductByStore()
  }

  getAllProductByStore() {
    this.callApi.getAllProductByStore().subscribe(data => {
      this.products = data
      console.log(data)
    })
  }

  setProductIdtolocal(productId: any) {
    this.router.navigate(['/product-edit'], {queryParams: {id:productId}})
  }

  deleteProductById(productId: string) {
    this.alert.warning("ต้องการลบสินค้าหรือไม่ ?").then((result) => {
      if (result.isConfirmed) {
        this.callApi.deleteProductById(productId,this.formProduct.value).subscribe(data => {
          this.getAllProductByStore()
          console.log(data);
        })
        this.alert.success("ลบสินค้าสำเร็จ")
      }
    })
  }


  searchProduct(keyword: string) {
    this.callApi.getSearchProduct(keyword).subscribe((res: any) => {
     this.products = res
      console.log(res);   
    })
  }

}
