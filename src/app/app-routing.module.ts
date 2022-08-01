import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderHistoryComponent } from './components/order/order-history/order-history.component';
import { OrderStoreComponent } from './components/order/order-store/order-store.component';

import { PaymentComponent } from './components/payment/payment.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductShareComponent } from './components/product/product-share/product-share.component';
import { ProductStoreComponent } from './components/product/product-store/product-store.component';
import { ProfileAffiliateComponent } from './components/profile/profile-affiliate/profile-affiliate.component';
import { ProfileUpdateComponent } from './components/profile/profile-update/profile-update.component';
import { ProfileUserComponent } from './components/profile/profile-user/profile-user.component';
import { RegisterCustomerComponent } from './components/register/register-customer/register-customer.component';
import { RegisterStoreComponent } from './components/register/register-store/register-store.component';
import { RegisterUserComponent } from './components/register/register-user/register-user.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'register-user', component: RegisterUserComponent},
  { path: 'register-customer', component: RegisterCustomerComponent},
  { path: 'register-store', component: RegisterStoreComponent},
  { path: 'product-detail', component: ProductDetailComponent},
  { path: 'product-store', component: ProductStoreComponent},
  { path: 'product-create', component: ProductCreateComponent},
  { path: 'product-edit', component: ProductEditComponent},
  { path: 'product-share', component: ProductShareComponent},
  { path: 'cart', component: CartComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile-user', component: ProfileUserComponent},
  { path: 'profile-update', component: ProfileUpdateComponent},
  { path: 'profile-store', component: ProductStoreComponent},
  { path: 'profile-affiliate', component: ProfileAffiliateComponent},
  { path: 'order-history', component: OrderHistoryComponent},
  { path: 'order-store', component: OrderStoreComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
