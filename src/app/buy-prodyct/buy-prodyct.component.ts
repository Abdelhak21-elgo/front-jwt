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
        { prodcutId: x.productId, quantity: 0 }
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
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  getproductQuantity(productId: any) {
    return this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.prodcutId === productId
    )[0].quantity;
  }

  incrementQuantity(productId: any, incrementBy: number) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.prodcutId === productId
    );
    if ( filteredProduct[0].quantity >= 10 ) return ;
    filteredProduct[0].quantity += incrementBy;

  }

  decrementQuantity(productId: any, decrementBy: number) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.prodcutId === productId
    )
    if ( filteredProduct[0].quantity <=0 ) return ;
    filteredProduct[0].quantity -= decrementBy;
  }

  getCalculatedTotal(productId: any, productDiscountedPrice: any) {
    return this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.prodcutId === productId
    )[0].quantity * productDiscountedPrice;
  }

  calculatGrandTotale() {
    let grandTotal = 0;

    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(
          (product) => product.productId === productQuantity.prodcutId
        )[0].productCurentPrice;
        grandTotal += price * productQuantity.quantity;
      }
    );
    return grandTotal;
  }
}
