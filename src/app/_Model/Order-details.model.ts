import { OrderQuantity } from "./OrderQuantity.model";

export interface OrderDetails{
    fullName : string,
    fullAdress : string,
    contactNumber: string,
    contactAlterNumber : string,
    orderProductQuantityList : OrderQuantity[]
}