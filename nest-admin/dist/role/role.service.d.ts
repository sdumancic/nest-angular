import { Repository } from "typeorm";
import { Role } from "./role.entity";
import { AbstractService } from "../abstract/abstract.service";
export declare class RoleService extends AbstractService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
}
