import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_Model/Product.model';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails : Product[] =[];

  displayedColumns: string[] = ['productId','productName', 'productDescription', 'productCurentPrice', 'productDiscountedPrice'];
  constructor( private productService : ProductService ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        // console.log(response);
        this.productDetails = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}