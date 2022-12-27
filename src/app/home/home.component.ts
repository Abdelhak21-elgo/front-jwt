import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { map } from 'rxjs';
import { Product } from '../_Model/Product.model';
import { ImageProessingService } from '../image-proessing.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetails: Product[] = [];
  
  constructor(private productService : ProductService,private imageprocessingService: ImageProessingService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  public getAllProduct(){
    this.productService.getAllProducts().pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageprocessingService.createImafes(product)))
    )
    .subscribe(
      (response: Product[]) => {
        console.log(response);
        this.productDetails = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );;
  }
}
