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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'User', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'Login', component: LoginComponent },
  { path: 'Forbidden', component: ForbiddenComponent },
  { path: 'AddProduct', component: AddProductComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] }, resolve: { product: ProductResolveService } },
  { path: 'ShowProductDetails', component: ShowProductDetailsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'ViewProduct', component: ViewProductComponent, resolve : { product: ProductResolveService } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
