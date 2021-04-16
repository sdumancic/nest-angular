import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class PermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
