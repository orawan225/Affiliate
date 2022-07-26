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
  file: any
  img: any = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'

  constructor(private callApi: CallApiService, private fb: FormBuilder, private alert: AlertService, private router: Router) {
    this.formCreateProduct = fb.group({
      productName: [null],
      productDetail: [null],
      productPrice: [null]
    })
  }

  ngOnInit(): void {
  }

  createProduct() {
    const fileData = new FormData()
    fileData.append('file', this.file, this.file.name)
    fileData.append('product', JSON.stringify(this.formCreateProduct.value))
    console.log(this.formCreateProduct.value);
    this.callApi.createProduct(fileData).subscribe(data => {
      console.log(data);
      this.alert.success("เพิ่มสินค้าสำเร็จ")
      setTimeout(() => {
        this.router.navigate(['/product-store'])
      }, 1000);
    }, ((err: any) => {
      if (err.status === 417) {
        this.alert.error(err.error.message)
      }
    }))
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


