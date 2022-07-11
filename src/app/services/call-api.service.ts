import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { user } from '../models/user';
import { product } from '../models/product';
import { store } from '../models/store';
import { CookieServiceService } from './cookie-service.service';
import { profile } from '../models/profile';
import { affiliate } from '../models/affiliate';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  [x: string]: any;
  cartDataList: any = []
  productList = new BehaviorSubject<any>([])

  constructor(public http: HttpClient, private cookie: CookieServiceService) {

   }

  public header() {
    let token = this.cookie.getToken()
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  //User
  public registerUser(data: any) {
    return this.http.post<user>(`${environment.apiUrl}/auth/user-register`, data)
  }

  public loginUser(data: any) {
    return this.http.post<user>(`${environment.apiUrl}/auth/user-login`, data)
  }

  public getProfile(){
    return this.http.get<profile>(`${environment.apiUrl}/user/getProfile`, this.header())
  }



  //Affiliate
  public registerCustomer(data: any) {
    return this.http.post<affiliate>(`${environment.apiUrl}/affiliate/affiliate-register`, data, this.header())
  }


  //Store
  public registerStore(data: any) {
    return this.http.post<store>(`${environment.apiUrl}/store/store-register`, data, this.header())
  }

  public getAllStore(data: store) {
    return this.http.post<store>(`${environment.apiUrl}/store/getAll-store`, data, this.header())
  }



  //Product
  public getAllProduct() {
    return this.http.get<product>(`${environment.apiUrl}/auth/getAll-byStatusIsTrue-product`)
  }

  public getAllProductByStore() {
    return this.http.get<product>(`${environment.apiUrl}/product/getMy-productByStoreIsTrue`, this.header())
  }

  public getProductById(productId: any) {
    return this.http.get<product>(`${environment.apiUrl}/auth/getProductById/${productId}`)
  }

  public createProduct(product: any) {
    return this.http.post<product>(`${environment.apiUrl}/product/create-product`,product, this.header())
  }

  public editProductById(productId: string, product: product) {
    return this.http.put<product>(`${environment.apiUrl}/product/update-product/${productId}`, product, this.header())
  }

  public deleteProductById(productId: string, product: product) {
    return this.http.put<product>(`${environment.apiUrl}/product/update-productByStatus/${productId}`, product, this.header())
  }



  // in Cart

  // getProductData() {
  //   return this.cartDataList.asObservable()
  // }

  // setProduct(product: any) {
  //   this.cartDataList.push(...product)
  //   this.productList.next(product)
  // }

  // addToCard(product: any) {
  //   this.cartDataList.push(product)
  //   this.productList.next(this.cartDataList)
  //   this.getTotalAmount()
  //   console.log(this.cartDataList);
    
  // }

  // getTotalAmount() {
  //   let gradTotal = 0
  //   this.cartDataList.map((data: any) => {
  //     gradTotal += data.total
  //   })
  // }

  // removeCartData(product: any) {
  //   this.cartDataList.map((data: any, index:any) => {
  //     if(product.id === data.id){
  //       this.cartDataList.splice(index,1)
  //     }
  //   })
  // }

  // removeAllCart() {
  //   this.cartDataList = []
  //   this.productList.next(this.cartDataList)
  // }




}
