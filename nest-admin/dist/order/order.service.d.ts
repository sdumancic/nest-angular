import { AbstractService } from "../abstract/abstract.service";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { PaginatedResult } from "../common/paginated-result.interface";
export declare class OrderService extends AbstractService {
    readonly orderRepository: Repository<Order>;
    constructor(orderRepository: Repository<Order>);
    create(order: Order): Promise<any>;
    paginate(page?: number, relations?: any[]): Promise<PaginatedResult>;
    chart(): Promise<any>;
}
