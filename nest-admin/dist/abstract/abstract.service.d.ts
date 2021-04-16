import { Repository } from "typeorm";
import { PaginatedResult } from "../common/paginated-result.interface";
export declare abstract class AbstractService {
    protected readonly repository: Repository<any>;
    protected constructor(repository: Repository<any>);
    all(relations?: any[]): Promise<any[]>;
    create(data: any): Promise<any>;
    findOne(condition: any, relations?: any[]): Promise<any>;
    paginate(page?: number, relations?: any[]): Promise<PaginatedResult>;
    update(id: number, data: any): Promise<any>;
    delete(id: number): Promise<any>;
}
