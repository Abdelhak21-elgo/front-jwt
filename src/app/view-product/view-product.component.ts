import { Component, OnInit } from '@angular/core';
import { Product } from '../_Model/Product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  selectedProductindex = 0;
  product! : Product;
  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeImagesindex(index : number){
    this.selectedProductindex = index
  }
}
