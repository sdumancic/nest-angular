import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {AbstractService} from "../abstract/abstract.service";
import {InjectRepository} from "@nestjs/typeorm";
import {getConnection, QueryFailedError, Repository} from "typeorm";
import {Order} from "./order.entity";
import {PaginatedResult} from "../common/paginated-result.interface";
import {OrderItem} from "./order-item.entity";


@Injectable()
export class OrderService extends AbstractService{


    constructor(@InjectRepository(Order) readonly orderRepository: Repository<Order>) {
        super(orderRepository);
    }

    async create(order: Order) {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(Order, order);

            for (const item of order.order_items) {
                item.order = order;
                await queryRunner.manager.save(OrderItem, item);
            }
            order.orderTotal = order.order_items.reduce((orderTotal, i) => orderTotal + i.quantity * i.price, 0);
            await queryRunner.manager.save(Order, order);
            await queryRunner.commitTransaction();
        }
        catch (err: any) {
            await queryRunner.rollbackTransaction();
            if (err instanceof QueryFailedError) {
                console.log('radi ', err as QueryFailedError);
            }
            throw new BadRequestException(err.code, err.sqlMessage);
        } finally {
            await queryRunner.release();
        }

        return this.findOne({id: order.id}, ['order_items']);

    }

    async paginate(page: number = 1, relations: any[] = []): Promise<PaginatedResult> {
        const {data, meta} = await super.paginate(page, relations);

        return {
            data: data.map(order => ({
                id: order.id,
                name: order.name,
                email: order.email,
                price: order.price,
                total: order.total,
                created_at: order.created_at,
                order_items: order.order_items
           })),
            meta
        }
    }

    async chart() {
        const sql = '' +
            'select DATE_FORMAT(created_at,\'%Y-%m-%d\') as date, ' +
            '       sum(oi.price * oi.quantity) as sum\n' +
            '  from orders o\n' +
            '  join order_items oi on o.id = oi.order_id\n' +
            'group by created_at;\n';
        return this.orderRepository.query(sql);
    }
}
