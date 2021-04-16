"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const abstract_service_1 = require("../abstract/abstract.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const order_item_entity_1 = require("./order-item.entity");
let OrderService = class OrderService extends abstract_service_1.AbstractService {
    constructor(orderRepository) {
        super(orderRepository);
        this.orderRepository = orderRepository;
    }
    async create(order) {
        const connection = typeorm_2.getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(order_entity_1.Order, order);
            for (const item of order.order_items) {
                item.order = order;
                await queryRunner.manager.save(order_item_entity_1.OrderItem, item);
            }
            order.orderTotal = order.order_items.reduce((orderTotal, i) => orderTotal + i.quantity * i.price, 0);
            await queryRunner.manager.save(order_entity_1.Order, order);
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            if (err instanceof typeorm_2.QueryFailedError) {
                console.log('radi ', err);
            }
            throw new common_1.BadRequestException(err.code, err.sqlMessage);
        }
        finally {
            await queryRunner.release();
        }
        return this.findOne({ id: order.id }, ['order_items']);
    }
    async paginate(page = 1, relations = []) {
        const { data, meta } = await super.paginate(page, relations);
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
        };
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
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map