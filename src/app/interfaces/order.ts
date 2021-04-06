import { OrderProduct } from './order-product';

export interface Order {
    id: number,
    date: Date,
    clientId: number,
    orderProducts: OrderProduct[],
    paymentId: number,
    shippingId: number,
    totalPrice: number,
    state: string
}