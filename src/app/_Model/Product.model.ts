import { FileHandler } from "./FileHandler.model";

export interface Product{
    productId : number
    productName :string,
    productDescription : string,
    productCurentPrice :number,
    productDiscountedPrice :number,
    productImages : FileHandler[]
}