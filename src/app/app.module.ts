import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AccountComponent } from './components/account/account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { SearchComponent } from './components/search/search.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartListComponent } from './components/shopping-cart-list/shopping-cart-list.component';
import { StoreComponent } from './components/store/store.component';
import { ProductQuantityPipe } from './pipes/product-quantity.pipe';
import { StockPipe } from './pipes/stock.pipe';
import { NoPricePipe } from './pipes/no-price.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { CollapseModule } from 'ngx-bootstrap/collapse'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainMenuComponent,
    FooterComponent,
    AccountComponent,
    CheckoutComponent,
    ContactsComponent,
    ErrorComponent,
    HomeComponent,
    LeftMenuComponent,
    OrdersComponent,
    ProductComponent,
    ProductsComponent,
    SearchComponent,
    ShoppingCartComponent,
    ShoppingCartListComponent,
    StoreComponent,
    ProductQuantityPipe,
    StockPipe,
    NoPricePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: LOCALE_ID, useValue: 'pt-PT'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
