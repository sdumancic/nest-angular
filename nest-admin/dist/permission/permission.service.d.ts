import { Permission } from "./permission.entity";
import { Repository } from "typeorm";
import { AbstractService } from "../abstract/abstract.service";
export declare class PermissionService extends AbstractService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
}
