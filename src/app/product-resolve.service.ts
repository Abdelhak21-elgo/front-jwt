import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_Model/Product.model';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './_Services/product.service';
import { ImageProessingService } from './image-proessing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(private productService : ProductService, private imageprocessingService : ImageProessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id  = route.paramMap.get("productId");
    if (id) {
      // then we have to fetch details fom backend
      return this.productService.getProductDetailsById(id).pipe(
        map(p => this.imageprocessingService.createImafes(p)));
    } else {
      // return empty product observable
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId : 0,
      productName: "",
      productDescription: "",
      productCurentPrice: 0,
      productDiscountedPrice: 0,
      productImages: []
    };
  }
}
