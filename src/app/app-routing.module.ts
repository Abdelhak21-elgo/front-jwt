import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_Auth/auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolveService } from './product-resolve.service';
import { ViewProductComponent } from './view-product/view-product.component';
import { BuyProdyctComponent } from './buy-prodyct/buy-prodyct.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'User', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'Forbidden', component: ForbiddenComponent },
  { path: 'AddProduct', component: AddProductComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }, resolve: { product: ProductResolveService } },
  { path: 'ShowProductDetails', component: ShowProductDetailsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'ViewProduct', component: ViewProductComponent, resolve: { product: ProductResolveService } },
  { path: 'BuyProdyct', component: BuyProdyctComponent, canActivate: [AuthGuard], data: { roles: ['User'] }, resolve: { productDetails: BuyProductResolverService } },
  { path: 'OrderConfirmation', component: OrderConfirmationComponent, canActivate: [AuthGuard], data: { roles: ['User'] } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
