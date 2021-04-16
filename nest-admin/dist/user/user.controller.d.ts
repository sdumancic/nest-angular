import { UserService } from "./user.service";
import { User } from "./models/user.entity";
import { UserDto } from "./models/user.dto";
import { EditUserDto } from "./models/edit-user.dto";
import { AuthService } from "../auth/auth.service";
import { Request } from 'express';
export declare class UserController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    all(page?: number): Promise<import("../common/paginated-result.interface").PaginatedResult>;
    create(body: UserDto): Promise<User>;
    get(id: number): Promise<any>;
    updateInfo(request: Request, body: EditUserDto): Promise<any>;
    updatePassword(request: Request, password: string, passwordConfirm: string): Promise<any>;
    update(id: number, body: EditUserDto): Promise<any>;
    delete(id: number): Promise<any>;
}
