import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { AppComponent } from './app.component';


// <--- Material --->
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import {MatNativeDateModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';


// <---- Navbar --->
import { NavbarHeaderComponent } from './components/navbar/navbar-header/navbar-header.component';
import { NavbarFooterComponent } from './components/navbar/navbar-footer/navbar-footer.component';
import { NavbarLoginComponent } from './components/navbar/navbar-login/navbar-login.component';
import { NavbarRegisterComponent } from './components/navbar/navbar-register/navbar-register.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';


// <---- Regisger --->
import { RegisterUserComponent } from './components/register/register-user/register-user.component';
import { RegisterCustomerComponent } from './components/register/register-customer/register-customer.component';
import { RegisterStoreComponent } from './components/register/register-store/register-store.component';

// <---- Logion --->
import { LoginComponent } from './components/login/login.component';


// <---- Profile --->
import { ProfileUpdateComponent } from './components/profile/profile-update/profile-update.component';
import { ProfileUserComponent } from './components/profile/profile-user/profile-user.component';
import { ProfileStoreComponent } from './components/profile/profile-store/profile-store.component';
import { ProfileAffiliateComponent } from './components/profile/profile-affiliate/profile-affiliate.component';



import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';



// <---- User --->
import { PaymentComponent } from './components/payment/payment.component';
import { OrderHistoryComponent } from './components/order/order-history/order-history.component';
import { OrderProductComponent } from './components/order/order-product/order-product.component';
import { OrderUserComponent } from './components/order/order-user/order-user.component';
import { OrderWaitPaymentComponent } from './components/order/order-wait-payment/order-wait-payment.component';
import { OrderWaitDeliveryComponent } from './components/order/order-wait-delivery/order-wait-delivery.component';
import { OrderSuccessComponent } from './components/order/order-success/order-success.component';


// <---- Store --->
import { OrderStoreComponent } from './components/order/order-store/order-store.component';
import { OrderDeliveryComponent } from './components/order/order-delivery/order-delivery.component';
import { ProductStoreComponent } from './components/product/product-store/product-store.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { OrderDlvHistoryComponent } from './components/order/order-dlv-history/order-dlv-history.component';
import { ShareLinkComponent } from './components/share-link/share-link.component';


// <---- Admin --->
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserComponent } from './components/admin/user/user.component';
import { AffiliateComponent } from './components/admin/affiliate/affiliate.component';
import { StoreComponent } from './components/admin/store/store.component';
import { MoneyComponent } from './components/admin/money/money.component';
import { OrderlistComponent } from './components/admin/order/orderlist/orderlist.component';
import { WithdrawHistoryComponent } from './components/admin/withdraw-history/withdraw-history.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { BankComponent } from './components/admin/bank/bank.component';
import { ProfileAdminComponent } from './components/admin/profile-admin/profile-admin.component';
import { UpdateUserComponent } from './components/admin/update/update-user/update-user.component';
import { OrderlistUserComponent } from './components/admin/order/orderlist-user/orderlist-user.component';
import { OrderlistPaymentComponent } from './components/admin/order/orderlist-payment/orderlist-payment.component';



// <---- Affiliate --->
import { ProductShareComponent } from './components/product/product-share/product-share.component';
import { ShareHistoryComponent } from './components/share-history/share-history.component';
import { ProductbystoreComponent } from './components/productbystore/productbystore.component';




import { MoneyHistoryComponent } from './components/money-history/money-history.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';








@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarHeaderComponent,
    NavbarFooterComponent,
    NavbarLoginComponent,
    NavbarRegisterComponent,
    RegisterUserComponent,
    RegisterCustomerComponent,
    RegisterStoreComponent,
    ProductDetailComponent,
    ProductStoreComponent,
    ProductCreateComponent,
    ProductEditComponent,
    CartComponent,
    PaymentComponent,
    LoginComponent,
    ProfileUpdateComponent,
    ProfileUserComponent,
    OrderHistoryComponent,
    OrderStoreComponent,
    ProfileStoreComponent,
    ProfileAffiliateComponent,
    ProductShareComponent,
    OrderProductComponent,
    DashboardComponent,
    UserComponent,
    AffiliateComponent,
    StoreComponent,
    MoneyComponent,
    MoneyHistoryComponent,
    NavbarComponent,
    OrderlistComponent,
    WithdrawHistoryComponent,
    OrderDeliveryComponent,
    OrderWaitPaymentComponent,
    OrderWaitDeliveryComponent,
    OrderSuccessComponent,
    ProfileComponent,
    ProfileAdminComponent,
    OrderDlvHistoryComponent,
    ShareLinkComponent,
    ShareHistoryComponent,
    ProductbystoreComponent,
    BankComponent,
    UpdateUserComponent,
    OrderUserComponent,
    OrderlistUserComponent,
    OrderlistPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ShareButtonsModule,
    ShareIconsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSliderModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
