import { Component, OnInit } from '@angular/core';
import { Product } from '../_Model/Product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_Services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandler } from '../_Model/FileHandler.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product = {
    productName: "",
    productDescription: "",
    productCurentPrice: 0,
    productDiscountedPrice: 0,
    productImages: []
  }
  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  addProduct(productForm: NgForm) {
    const productformdata = this.preparFormdata(this.product);
    this.productService.addProduct(productformdata).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  preparFormdata(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imagefile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const fileUp = event?.target.files[0];
      const fileHandel: FileHandler = {
        file: fileUp,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileUp))
      }
      this.product.productImages.push(fileHandel);
    }
  }

  removeimage(i : number){
    this.product.productImages.splice(i,1);
  }


  fileDroped(fileHandel: FileHandler){
    this.product.productImages.push(fileHandel);
  }

}
