import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { user } from '../models/user';
import { product } from '../models/product';
import { store } from '../models/store';
import { CookieServiceService } from './cookie-service.service';
import { profile } from '../models/profile';
import { affiliate } from '../models/affiliate';
import { BehaviorSubject } from 'rxjs';
import { orderDetail, orderList } from '../models/order';
import { withdraw } from '../models/withdraw';


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

  public getProfilesAdmin() {
    return this.http.get<profile>(`${environment.apiUrl}/order-list/get-detail-admin`, this.header())
  }

  public getWithdraw() {
    return this.http.get(`${environment.apiUrl}/user/get-withdraw-by-user`, this.header())
  }

  public getProductByStore(storeId: any) {
    return this.http.get(`${environment.apiUrl}/auth/getAll-productByStoreId/${storeId}`)
  }

  public getOrderByUser() {
    return this.http.get(`${environment.apiUrl}/order-list/get-my-order-status-wait-payment`, this.header())
  }




  //Profile
  public getProfile() {
    return this.http.get<profile>(`${environment.apiUrl}/user/getProfile`, this.header())
  }

  public editProfile(user: any) {
    return this.http.put<profile>(`${environment.apiUrl}/user/update-profile`, user, this.header())
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

  public shareProduct(productId: any) {
    return this.http.post(`${environment.apiUrl}/affiliate/affiliate-share-product/${productId}`, productId, this.header())
  }

  public wathdrawMoneyAffiliate(withdraw: any) {
    return this.http.put(`${environment.apiUrl}/affiliate/withdraw-money-for-affiliate?withdraw=` + withdraw, {}, this.header())
  }

  public shareHistory() {
    return this.http.get(`${environment.apiUrl}/affiliate/get-share-link-success-for-affiliate`, this.header())
  }


  //Store
  public registerStore(data: any) {
    return this.http.post<store>(`${environment.apiUrl}/store/store-register`, data, this.header())
  }

  public getAllStore() {
    return this.http.get<store[]>(`${environment.apiUrl}/store/getAll-store`, this.header())
  }

  public wathdrawMoney(withdraw: any) {
    return this.http.put(`${environment.apiUrl}/store/withdraw-money-for-store?withdraw=` + withdraw, {}, this.header())
  }

  public wathdrawMoneyHistory() {
    return this.http.get(`${environment.apiUrl}/user/get-withdraw-by-user`, this.header())
  }

  public getWallet() {
    return this.http.get(`${environment.apiUrl}/user/get-wallet-by-user`, this.header())
  }

  public getStatusSuccess() {
    return this.http.get(`${environment.apiUrl}/store/get-order-status-success-by-store`, this.header())
  }

  public getOrderSuccess() {
    return this.http.get(`${environment.apiUrl}/order-list/get-my-order-status-success`, this.header())
  }


  public getShareLinkSuccess(productId: any) {
    return this.http.get<product>(`${environment.apiUrl}/store/get-share-link-success-for-store/${productId}`, this.header())
  }






  //Product
  public getAllProduct() {
    return this.http.get<product>(`${environment.apiUrl}/auth/getAll-byStatusIsTrue-product`)
  }

  public getAllProductByStore() {
    return this.http.get<product>(`${environment.apiUrl}/product/get-my-product-by-store-is-true`, this.header())
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

  public getProductWaitPayment() {
    return this.http.get<product>(`${environment.apiUrl}/order-list/get-my-order-status-is-true`, this.header())
  }

  public deliverySuccess(orderListId: string, order: orderDetail) {
    return this.http.put<orderList>(`${environment.apiUrl}/order-list/update-order-deliver-status-is-true/${orderListId}`, order, this.header())
  }

  public getOrderHistoryDelivery() {
    return this.http.get<orderList>(`${environment.apiUrl}/store/get-my-order-deliver-is-true-by-store`, this.header())
  }






  //Order

  public createPayment(orderId: string, order: any) {
    return this.http.put<orderList>(`${environment.apiUrl}/order-list/add-slip-by-order/${orderId}`, order, this.header())
  }

  public getAllOrderByStore() {
    return this.http.get<orderList[]>(`${environment.apiUrl}/store/get-order-status-payment-by-store`, this.header())
  }

  public addOrderDetail(data: any) {
    return this.http.post<orderDetail>(`${environment.apiUrl}/order-detail/addProducts`, data, this.header())
  }

  public getAllByStoreId() {
    return this.http.get<orderDetail>(`${environment.apiUrl}/order-detail/getAllByStoreId`, this.header())
  }

  public getOrderDetail(orderId: any) {
    return this.http.get<orderList>(`${environment.apiUrl}/order-list/getOrderDetail?id=${orderId}`, this.header())
  }

  public getSearchProduct(product: string) {
    return this.http.get<product>(`${environment.apiUrl}/auth/product-search?keyword=${product}`)
  }

  public trackingNumber(orderId: any, order: orderList) {
    return this.http.put<orderList>(`${environment.apiUrl}/store/update-order-success/${orderId}`, order, this.header())
  }

  public deleteOrderProduct(orderListId: string, order: orderDetail) {
    return this.http.put<orderList>(`${environment.apiUrl}/order-list/update-order-false/${orderListId}`, order, this.header())
  }

  public getOrderHistory() {
    return this.http.get<orderList>(`${environment.apiUrl}/order-list/get-my-order-deliver-is-true`, this.header())
  }

  public getWaitDeliveryOrder() {
    return this.http.get<orderList>(`${environment.apiUrl}/order-list/get-my-order-status-payment`, this.header())
  }


  public orderSuccess(orderListId: string, order: orderDetail) {
    return this.http.put<orderList>(`${environment.apiUrl}/order-list/update-order-deliver-status-is-true/${orderListId}`, order, this.header())
  }


  // admin
  public getAllUser() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-user`, this.header())
  }

  public getAllAffiliate() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-affiliate`, this.header())
  }

  public getStore() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-store`, this.header())
  }

  public getOrderStore() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-order-by-admin`, this.header())
  }

  public updateOrderPayment(orderListId: string, order: orderList) {
    return this.http.put<orderList>(`${environment.apiUrl}/admin/update-order-payment/${orderListId}`, order, this.header())
  }

  public withdrawMoney() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-order-status-withdraw-money`, this.header())
  }

  public updateOrderWithdraw(withdrawId: string, withdraw: any) {
    return this.http.put<withdraw>(`${environment.apiUrl}/admin/update-order-withdraw-success-and-add-slip/${withdrawId}`, withdraw, this.header())
  }

  public showStatusWithdraw() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-order-status-withdraw-success`, this.header())
  }

  public getWithdrawById(withdrawId: any) {
    return this.http.get(`${environment.apiUrl}/admin/get-withdraw-by-id/${withdrawId}`, this.header())
  }

  public getProfileAdmin() {
    return this.http.get<profile>(`${environment.apiUrl}/admin/get-my-profile-by-admin`, this.header())
  }

  public editProfileAdmin(user: any) {
    return this.http.put<profile>(`${environment.apiUrl}/admin/update-profile-by-admin/`, user, this.header())
  }

  public createPercent(data: any) {
    return this.http.post(`${environment.apiUrl}/admin/create-config`, data, this.header())
  }

  public getconfig() {
    return this.http.get(`${environment.apiUrl}/admin/get-config`, this.header())
  }

  public myWalletAdmin() {
    return this.http.get(`${environment.apiUrl}/admin/get-my-wallet`, this.header())
  }

  public getBankAccount() {
    return this.http.get(`${environment.apiUrl}/admin/get-bank-account`, this.header())
  }

  public editBank(data: any) {
    return this.http.post(`${environment.apiUrl}/admin/create-bank-account`, data, this.header())
  }


  public getUserById(userId: any) {
    return this.http.get(`${environment.apiUrl}/admin/get-user-by-id/${userId}`, this.header())
  }

  public editProfileUser(userId: string, user: any) {
    return this.http.put<profile>(`${environment.apiUrl}/admin/update-user-account-by-admin/${userId}`,user, this.header())
  }

  public getAllOderUser() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-order-status-delivery-is-false`, this.header())
  }

  public orderdeliverySuccess(orderListId: string, order:any) {
    return this.http.put<orderList>(`${environment.apiUrl}/admin/update-order-deliver-status-is-true/${orderListId}`, order, this.header())
  }

  public getAllOrderDelivery() {
    return this.http.get(`${environment.apiUrl}/admin/get-all-order-status-payment`, this.header())
  }

  public usernameSearch(user: string) {
    return this.http.get(`${environment.apiUrl}/admin/get-username-search?keyword=${user}`,this.header())
  }

  public getProfileAdmins() {
    return this.http.get<profile>(`${environment.apiUrl}/auth/get-profile-by-admin`)
  }

}
