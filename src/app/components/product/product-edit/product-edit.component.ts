import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { AlertService } from 'src/app/services/alert.service';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  formProduct: any
  api = environment.apiUrl
  product: any = []
  file: any
  img: any
  productId: any

  constructor(private callApi: CallApiService, private router: Router,
    private fb: FormBuilder, private alert: AlertService, private acrout: ActivatedRoute) {
    this.formProduct = fb.group({
      productName: [null],
      productPrice: [null],
      productDetail: [null]
    })

    acrout.queryParams.subscribe((res: any) => {
      this.productId = res.id
      console.log(this.productId);
    })

    
  }

  patchValue(receiveProduct: product) {
    this.formProduct.patchValue({
      productName: receiveProduct.productName,
      productPrice: receiveProduct.productPrice,
      productDetail: receiveProduct.productDetail,
    })
  }


  ngOnInit(): void {
    this.getProductById()
  }

  getProductById() {
    this.callApi.getProductById(this.productId).subscribe(res => {
      this.product = res
      this.img = this.api+res.image
      this.patchValue(res)
      console.log(this.formProduct);
    })
  }


  editProductById(productId: string) {
    delete this.formProduct.value.productId
    const data = new FormData()
    if(this.file) {
      data.append('file', this.file, this.file.name)
    }
    data.append('product', JSON.stringify(this.formProduct.value))
    this.callApi.editProductById(productId, data).subscribe(data => {
      console.log(data);
      this.alert.success("แก้ไขสำเร็จ")
      setTimeout(() => {
        this.router.navigate(['/product-store'])
      }, 1000);
    })
  }

  selectFile(event: any) {
    this.file = <File>event.target.files[0]
    const image = new FileReader();
    image.readAsDataURL(this.file)
    image.onload = () => {
      this.img = image.result
      console.log(this.img);
    }
  }

}
