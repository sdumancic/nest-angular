import { OrderItem } from "./order-item.entity";
export declare class Order {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    orderTotal: number;
    created_at: string;
    order_items: OrderItem[];
    get name(): string;
    get total(): number;
}
