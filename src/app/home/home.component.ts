import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { map } from 'rxjs';
import { Product } from '../_Model/Product.model';
import { ImageProessingService } from '../image-proessing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showButtonLoad = false;
  pageNumber : number =0;
  productDetails: Product[] = [];
  
  constructor(private productService : ProductService,private imageprocessingService: ImageProessingService, private router : Router) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  public getAllProduct(){
    this.productService.getAllProducts(this.pageNumber).pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageprocessingService.createImafes(product)))
    )
    .subscribe(
      (response: Product[]) => {
        // console.log(response);
        if(response.length == 5) {this.showButtonLoad = true;} else {this.showButtonLoad = false;}
        response.forEach(p => this.productDetails.push(p));
        this.productDetails = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  ShowProductDetails(productId:any){
    this.router.navigate(["/ViewProduct", { productId : productId}]);
  }

  loadMoreProductI(incrementBy: number) {
    if(this.pageNumber >= 10) return ;
    this.pageNumber+=incrementBy;
    this.getAllProduct();
    }

    loadMoreProductD(incrementBy: number) {
      if(this.pageNumber <= 0) return ;
      this.pageNumber-=incrementBy;
      this.getAllProduct();
      }
}
