import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_Model/Order-details.model';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_Model/Product.model';
import { ProductService } from '../_Services/product.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-buy-prodyct',
  templateUrl: './buy-prodyct.component.html',
  styleUrls: ['./buy-prodyct.component.css']
})
export class BuyProdyctComponent implements OnInit {
  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAdress: '',
    contactNumber: '',
    contactAlterNumber: '',
    orderProductQuantityList: []
  };

  constructor(private activatedroute: ActivatedRoute,
    private productservie: ProductService) { }

  ngOnInit(): void {
    this.productDetails = this.activatedroute.snapshot.data['productDetails'];

    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        { prodcutId: x.productId, quantity: 1 }
      )
    );

    console.log(this.orderDetails);
    console.log(this.productDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this.productservie.placeOrder(this.orderDetails).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
      },
      (err : HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
