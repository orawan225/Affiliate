import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterAffiliateComponent } from './components/affiliate/register-affiliate/register-affiliate.component';
import { RegisterShopComponent } from './components/shop/register-shop/register-shop.component';
import { LoginAffiliateComponent } from './components/affiliate/login-affiliate/login-affiliate.component';
import { LoginShopComponent } from './components/shop/login-shop/login-shop.component';
import { RegisterShopsComponent } from './components/shop/register-shops/register-shops.component';
import { RegisterCustomerComponent } from './components/customer/register-customer/register-customer.component';
import { LoginCustomerComponent } from './components/customer/login-customer/login-customer.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { RegisterComponent } from './components/shop/register/register.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { AddressComponent } from './components/address/address.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ShareComponent } from './components/share/share.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'loginaffiliate', component: LoginAffiliateComponent },
  { path: 'loginshop', component: LoginShopComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registeraffiliate', component: RegisterAffiliateComponent },
  { path: 'registershop', component: RegisterShopComponent },
  { path: 'registershops', component: RegisterShopsComponent },
  { path: 'registercustomer', component: RegisterCustomerComponent },
  { path: 'logincustomer', component: LoginCustomerComponent },
  { path: 'createproduct', component: CreateProductComponent },
  { path: 'productdetail', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'address', component: AddressComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'share', component: ShareComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
