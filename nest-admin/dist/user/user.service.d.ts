import { User } from "./models/user.entity";
import { Repository } from "typeorm";
import { AbstractService } from "../abstract/abstract.service";
import { PaginatedResult } from "../common/paginated-result.interface";
export declare class UserService extends AbstractService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    paginate(page?: number, relations?: any[]): Promise<PaginatedResult>;
}
