import { Location } from "./location";
import { Product } from "./product";
import { User } from "./user";

export interface Order{
    orderId: string, 
    location: Location,
    products: Product[],
    orderedBy: User,
    orderDate: Date

}