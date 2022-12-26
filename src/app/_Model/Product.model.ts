import { FileHandler } from "./FileHandler.model";

export interface Product{
    productName :string,
    productDescription : string,
    productCurentPrice :number,
    productDiscountedPrice :number,
    productImages : FileHandler[]
}