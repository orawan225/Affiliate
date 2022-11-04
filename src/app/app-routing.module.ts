import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffiliateComponent } from './components/admin/affiliate/affiliate.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MoneyComponent } from './components/admin/money/money.component';
import { StoreComponent } from './components/admin/store/store.component';
import { UserComponent } from './components/admin/user/user.component';

import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MoneyHistoryComponent } from './components/money-history/money-history.component';
import { OrderHistoryComponent } from './components/order/order-history/order-history.component';
import { OrderProductComponent } from './components/order/order-product/order-product.component';
import { OrderStoreComponent } from './components/order/order-store/order-store.component';

import { PaymentComponent } from './components/payment/payment.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductShareComponent } from './components/product/product-share/product-share.component';
import { ProductStoreComponent } from './components/product/product-store/product-store.component';
import { ProfileUpdateComponent } from './components/profile/profile-update/profile-update.component';
import { ProfileUserComponent } from './components/profile/profile-user/profile-user.component';
import { RegisterCustomerComponent } from './components/register/register-customer/register-customer.component';
import { RegisterStoreComponent } from './components/register/register-store/register-store.component';
import { RegisterUserComponent } from './components/register/register-user/register-user.component';
import { GuardAdminService } from './services/guard-admin.service';
import { GuardAffiliateService } from './services/guard-affiliate.service';
import { GuardStoreService } from './services/guard-store.service';
import { GuardService } from './services/guard.service';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'register-user', component: RegisterUserComponent},
  { path: 'register-customer', component: RegisterCustomerComponent},
  { path: 'register-store', component: RegisterStoreComponent},
  { path: 'product-detail', component: ProductDetailComponent},
  { path: 'product-store', component: ProductStoreComponent,canActivate: [GuardStoreService]},
  { path: 'product-create', component: ProductCreateComponent,canActivate: [GuardStoreService]},
  { path: 'product-edit', component: ProductEditComponent,canActivate: [GuardService]},
  { path: 'product-share', component: ProductShareComponent,canActivate: [GuardAffiliateService]},
  { path: 'cart', component: CartComponent,canActivate: [GuardService]},
  { path: 'payment', component: PaymentComponent,canActivate: [GuardService]},
  { path: 'login', component: LoginComponent},
  { path: 'profile-user', component: ProfileUserComponent,canActivate: [GuardService]},
  { path: 'profile-update', component: ProfileUpdateComponent,canActivate: [GuardService]},
  // { path: 'profile-store', component: ProductStoreComponent },
  // { path: 'profile-affiliate', component: ProfileAffiliateComponent },
  { path: 'order-history', component: OrderHistoryComponent,canActivate: [GuardService]},
  { path: 'order-store', component: OrderStoreComponent,canActivate: [GuardStoreService]},
  { path: 'order-product', component: OrderProductComponent,canActivate: [GuardService]},
  { path: 'payment', component: PaymentComponent,canActivate: [GuardStoreService]},
  { path: 'dashboard', component: DashboardComponent,canActivate: [GuardAdminService]},
  { path: 'user', component: UserComponent,canActivate: [GuardAdminService]},
  { path: 'affiliate', component: AffiliateComponent,canActivate: [GuardAdminService]},
  { path: 'store', component: StoreComponent,canActivate: [GuardAdminService]},
  { path: 'money', component: MoneyComponent,canActivate: [GuardAdminService]},
  { path: 'money-history', component: MoneyHistoryComponent,canActivate: [GuardService]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
