import { Injectable } from '@angular/core';
import { Product } from './_Model/Product.model';
import { FileHandler } from './_Model/FileHandler.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProessingService {

  constructor(private sanitaizer: DomSanitizer) { }

  public createImafes(product: Product) {
    const productImages: any[] = product.productImages;

    const productImagesToFileHandle: FileHandler[] = [];

    for (let i = 0; i < productImages.length; i++) {
      const imagefileData = productImages[i];
      const imageBlob = this.dataURItoBlob(imagefileData.picByte, imagefileData.type);

      const imageFile = new File([imageBlob], imagefileData.name, { type: imagefileData.type });

      const finalFilahandele: FileHandler = {
        file: imageFile,
        url: this.sanitaizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      productImagesToFileHandle.push(finalFilahandele);
    }

    product.productImages = productImagesToFileHandle;

    return product;
  }

  public dataURItoBlob(picbytes: any, imagetype: any) {
    const byteString = window.atob(picbytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intBArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intBArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([intBArray], { type: imagetype });

    return blob;
  }
}
