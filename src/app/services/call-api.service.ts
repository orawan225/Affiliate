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
import { orderDetail, orderList } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class CallApiService {
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


  //Profile
  public getProfile() {
    return this.http.get<profile>(`${environment.apiUrl}/user/getProfile`, this.header())
  }

  public editProfile(user: any) {
    return this.http.put<profile>(`${environment.apiUrl}/user/update-profile/`, user, this.header())
  }
  
  public editProfileStore(user: any) {
    return this.http.put<profile>(`${environment.apiUrl}/store/store-update/`, user, this.header())
  }

  public editProfileAffiliate(user: any) {
    return this.http.put<profile>(`${environment.apiUrl}/affiliate/affiliate-update/`, user, this.header())
  }



  //Affiliate
  public registerAffiliate(data: any) {
    return this.http.post<affiliate>(`${environment.apiUrl}/affiliate/affiliate-register`, data, this.header())
  }


  //Store
  public registerStore(data: any) {
    return this.http.post<store>(`${environment.apiUrl}/store/store-register`, data, this.header())
  }

  public getAllStore() {
    return this.http.get<store[]>(`${environment.apiUrl}/store/getAll-store`, this.header())
  }

  public getTotalMoney() {
    return this.http.get(`${environment.apiUrl}/store/get-my-total-price`, this.header())
  }

  public wathdrawMoney(store: any) {
    return this.http.put<store>(`${environment.apiUrl}/store/update-order-withdraw-money/`, store, this.header())
  }
  



  //Product
  public getAllProduct() {
    return this.http.get<product>(`${environment.apiUrl}/auth/getAll-product`)
  }

  public getAllProductByStore() {
    return this.http.get<product>(`${environment.apiUrl}/product/getMy-productByStoreIsTrue`, this.header())
  }

  public getProductById(productId: any) {
    return this.http.get<product>(`${environment.apiUrl}/auth/getProductById/${productId}`)
  }

  public createProduct(product: any) {
    return this.http.post<product>(`${environment.apiUrl}/product/create-product`, product, this.header())
  }

  public editProductById(productId: any, product: any) {
    return this.http.put<product>(`${environment.apiUrl}/product/update-product/${productId}`, product, this.header())

  }

  public deleteProductById(productId: string, product: product) {
    return this.http.put<product>(`${environment.apiUrl}/product/update-productByStatus/${productId}`, product, this.header())
  }


  //Order

  public createPayment(orderId: string, order: any) {
    return this.http.put<orderList>(`${environment.apiUrl}/order-list/add-slip-by-order/${orderId}`, order, this.header())
  }

  public getAllOrderByStore() {
    return this.http.get<orderList[]>(`${environment.apiUrl}/order-list/getMyOrder`, this.header())
  }

  public checkStatusOrderById(orderId: string, order: orderList) {
    return this.http.put<orderList>(`${environment.apiUrl}/store/update-order-success/${orderId}`, order, this.header())
  }

  public addOrderDetail(data: any) {
    return this.http.post<orderDetail>(`${environment.apiUrl}/order-detail/addProducts`, data, this.header())
  }

  public getAllByStoreId() {
    return this.http.get<orderDetail>(`${environment.apiUrl}/order-detail/getAllByStoreId`,this.header())
  }
  
  public getOrderDetail(orderId: any) {
    return this.http.get<orderList>(`${environment.apiUrl}/order-list/getOrderDetail?id=${orderId}`,this.header())
  }
  
  public getSearchProduct(product: string) {
    return this.http.get<product>(`${environment.apiUrl}/auth/product-search?keyword=${product}`)
  }



  // admin
  public getAllUser() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-user`,this.header())
  }

  public getAllAffiliate() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-affiliate`,this.header())
  }

  public getStore() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-store`,this.header())
  }

  public getOrderStore() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-order`,this.header())
  }

  public updateOrderPayment(orderListId: string, order: orderList) {
    return this.http.put<orderList>(`${environment.apiUrl}/admin/update-order-payment/${orderListId}`, order, this.header())
  }


}
