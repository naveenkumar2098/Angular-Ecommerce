import { Cart } from './cart';
import { OrderUser } from './order-user';

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    addressOpt: string,
    phone: number,
    birthdate: Date,
    postalCode: string,
    city: string,
    country: string,
    shoppingCart: Cart[],
    orders: OrderUser[],
}