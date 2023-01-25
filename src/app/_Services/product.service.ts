import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_Model/Product.model';
import { environment } from 'src/environments/environment';
import { OrderDetails } from '../_Model/Order-details.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // apipath = environment.apipathback;
  apipath = "http://localhost:8080";

  constructor(private httpclient: HttpClient) { }

  public addProduct(product : FormData){
    return this.httpclient.post<Product>(this.apipath+"/addnewProduct", product);
  }

  public getAllProducts(pageNumber:number,searchKey : string =""){
    return this.httpclient.get<Product[]>(this.apipath+"/getAllproducts?pageNumber="+pageNumber+"&searchKey="+searchKey);
  }

  public deletProductDetails(productId : number){
    return this.httpclient.delete(this.apipath+"/deletProducrDetails/"+productId);
  }

  public getProductDetailsById(productId: any){
    return this.httpclient.get<Product>(this.apipath+"/getProductdetailsById/"+productId);
  }

  public getProductDetails(isSingleProductCheckout: any , productId: any){
    return this.httpclient.get<Product[]>(this.apipath+"/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails: OrderDetails){
    return this.httpclient.post(this.apipath +"/placeOrder", orderDetails);
  }
}
