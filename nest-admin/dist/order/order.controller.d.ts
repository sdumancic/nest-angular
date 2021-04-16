import { Order } from "./order.entity";
import { OrderService } from "./order.service";
import { Response } from 'express';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    all(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    create(body: Order): Promise<any>;
    export(res: Response): Promise<Response<any, Record<string, any>>>;
    chart(): Promise<any>;
}
