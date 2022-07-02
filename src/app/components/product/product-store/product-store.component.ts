import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { product } from 'src/app/models/product';
import { CallApiService } from 'src/app/services/call-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.css']
})
export class ProductStoreComponent implements OnInit {

  products: any

  constructor(private callApi: CallApiService, private router: Router, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.getAllProductByStore()
  }

  getAllProductByStore() {
    this.callApi.getAllProductByStore().subscribe(data=> {
      this.products = data
      console.log(data)
    })
  }

  setProductIdtolocal(id: string) {
    console.log(id);
    localStorage.setItem('productId', id)
    this.router.navigate(['/product-edit'])
  }

  deleteProductById(propuctId: string) {
    Swal.fire({
      position: 'top',
      text: "ต้องการลบข้อมูลนี้หรือไม่?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'ใช่, ฉันต้องการลบข้อมูล'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.callApi.deleteProductById(propuctId).subscribe(data => {
    //       console.log(data);
    //     })
    //     Swal.fire({
    //       position: 'top',
    //       icon: 'success',
    //       title: 'ลบสำเร็จ',
    //       showConfirmButton: false,
    //       timer: 1000
    //     })
    //   } 
    })
  }


}
