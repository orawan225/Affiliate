import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffiliateComponent } from './components/admin/affiliate/affiliate.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { MoneyComponent } from './components/admin/money/money.component';
import { OrderlistComponent } from './components/admin/order/orderlist/orderlist.component';
import { StoreComponent } from './components/admin/store/store.component';
import { UserComponent } from './components/admin/user/user.component';
import { WithdrawHistoryComponent } from './components/admin/withdraw-history/withdraw-history.component';

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
import { OrderDeliveryComponent } from './components/order/order-delivery/order-delivery.component';
import { GuardAdminService } from './services/guard-admin.service';
import { GuardAffiliateService } from './services/guard-affiliate.service';
import { GuardStoreService } from './services/guard-store.service';
import { GuardService } from './services/guard.service';
import { OrderWaitPaymentComponent } from './components/order/order-wait-payment/order-wait-payment.component';
import { OrderWaitDeliveryComponent } from './components/order/order-wait-delivery/order-wait-delivery.component';
import { OrderSuccessComponent } from './components/order/order-success/order-success.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { OrderDlvHistoryComponent } from './components/order/order-dlv-history/order-dlv-history.component';
import { ShareLinkComponent } from './components/share-link/share-link.component';
import { ShareHistoryComponent } from './components/share-history/share-history.component';
import { ProductbystoreComponent } from './components/productbystore/productbystore.component';
import { BankComponent } from './components/admin/bank/bank.component';
import { OrderUserComponent } from './components/order/order-user/order-user.component';
import { UpdateUserComponent } from './components/admin/update/update-user/update-user.component';
import { OrderlistUserComponent } from './components/admin/order/orderlist-user/orderlist-user.component';
import { OrderlistPaymentComponent } from './components/admin/order/orderlist-payment/orderlist-payment.component';
import { UpdateAffiliateComponent } from './components/admin/update/update-affiliate/update-affiliate.component';
import { UpdateStoreComponent } from './components/admin/update/update-store/update-store.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'register-user', component: RegisterUserComponent},
  { path: 'register-customer', component: RegisterCustomerComponent},
  { path: 'register-store', component: RegisterStoreComponent},
  { path: 'product-detail', component: ProductDetailComponent},
  // { path: 'productByStore', component: ProductbystoreComponent},
  { path: 'login', component: LoginComponent},



  // GuardService
  { path: 'profile-user', component: ProfileUserComponent,canActivate: [GuardService]},
  { path: 'profile-update', component: ProfileUpdateComponent,canActivate: [GuardService]},
  { path: 'cart', component: CartComponent,canActivate: [GuardService]},
  { path: 'payment', component: PaymentComponent,canActivate: [GuardService]},
  { path: 'product-edit', component: ProductEditComponent,canActivate: [GuardService]},
  { path: 'order-history', component: OrderHistoryComponent,canActivate: [GuardService]},
  { path: 'order-product', component: OrderProductComponent,canActivate: [GuardService]},
  { path: 'money-history', component: MoneyHistoryComponent,canActivate: [GuardService]},
  { path: 'order-wait-payment', component: OrderWaitPaymentComponent,canActivate: [GuardService]},
  { path: 'order-wait-delivery', component: OrderWaitDeliveryComponent,canActivate: [GuardService]},
  { path: 'order-success', component: OrderSuccessComponent,canActivate: [GuardService]},
  { path: 'order-success', component: OrderSuccessComponent,canActivate: [GuardService]},
  { path: 'order-user', component: OrderUserComponent,canActivate: [GuardService]},



  // GuardStoreService
  { path: 'product-store', component: ProductStoreComponent,canActivate: [GuardStoreService]},
  { path: 'product-create', component: ProductCreateComponent,canActivate: [GuardStoreService]},
  { path: 'order-store', component: OrderStoreComponent,canActivate: [GuardStoreService]},
  { path: 'payment', component: PaymentComponent,canActivate: [GuardStoreService]},
  { path: 'order-delivery', component: OrderDeliveryComponent,canActivate: [GuardStoreService]},
  { path: 'order-dlv-history', component: OrderDlvHistoryComponent,canActivate: [GuardStoreService]},
  { path: 'share-link', component: ShareLinkComponent,canActivate: [GuardStoreService]},


  // GuardAffiliateService
  { path: 'product-share', component: ProductShareComponent,canActivate: [GuardAffiliateService]},
  { path: 'share-history', component: ShareHistoryComponent,canActivate: [GuardAffiliateService]},
 

  // GuardAdminService
  { path: 'dashboard', component: DashboardComponent,canActivate: [GuardAdminService]},
  { path: 'user', component: UserComponent,canActivate: [GuardAdminService]},
  { path: 'affiliate', component: AffiliateComponent,canActivate: [GuardAdminService]},
  { path: 'store', component: StoreComponent,canActivate: [GuardAdminService]},
  { path: 'money', component: MoneyComponent,canActivate: [GuardAdminService]},
  { path: 'orderlist', component: OrderlistComponent,canActivate: [GuardAdminService]},
  { path: 'withdraw-history', component: WithdrawHistoryComponent,canActivate: [GuardAdminService]},
  { path: 'profile', component: ProfileComponent,canActivate: [GuardAdminService]},
  { path: 'bank', component: BankComponent,canActivate: [GuardAdminService]},
  { path: 'update-user', component: UpdateUserComponent,canActivate: [GuardAdminService]},
  { path: 'update-affiliate', component: UpdateAffiliateComponent,canActivate: [GuardAdminService]},
  { path: 'update-store', component: UpdateStoreComponent,canActivate: [GuardAdminService]},
  { path: 'orderlist-user', component: OrderlistUserComponent,canActivate: [GuardAdminService]},
  { path: 'orderlist-payment', component: OrderlistPaymentComponent,canActivate: [GuardAdminService]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
