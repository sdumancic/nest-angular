import {Controller, Delete, Get} from '@nestjs/common';
import {PermissionService} from "./permission.service";
import {HasPermission} from "./has-permission.decorator";

@Controller('permissions')
export class PermissionController {


    constructor(private permissionService: PermissionService) {
    }

    @Get()
    //@HasPermission('view_permissions')
    async all(){
        return this.permissionService.all();
    }

    @Delete()
    //@HasPermission('view_permissions')
    async delete(id: number){
        return this.permissionService.delete(id);
    }
}
