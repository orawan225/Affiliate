import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productbystore',
  templateUrl: './productbystore.component.html',
  styleUrls: ['./productbystore.component.css']
})
export class ProductbystoreComponent implements OnInit {

  products: any
  api = environment.apiUrl
  storeId: any

  constructor(private callApi: CallApiService, private router: Router, private acrout: ActivatedRoute) { 

    acrout.queryParams.subscribe((res: any) => {
      this.storeId = res.id
    })
  }

  ngOnInit(): void {
    this.getAllProductByStore()
  }

  getAllProductByStore() {
    this.callApi.getProductByStore(this.storeId).subscribe(data => {
      this.products = data
      console.log(data);
    })
  }

  setProductIdtolocal(productId : string) {
    this.router.navigate(['/product-detail'],{queryParams: {id:productId}})
  }

}

