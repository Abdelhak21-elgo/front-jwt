import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_Model/Product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apipath = environment.apipathback;
  // apipath = "http://localhost:8080";

  constructor(private httpclient: HttpClient) { }

  public addProduct(product : FormData){
    return this.httpclient.post<Product>(this.apipath+"/addnewProduct", product);
  }

  public getAllProducts(){
    return this.httpclient.get<Product[]>(this.apipath+"/getAllproducts");
  }
}
