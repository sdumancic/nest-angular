import { UserService } from "../user/user.service";
import { RegisterDto } from "./models/register.dto";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { RoleService } from "../role/role.service";
export declare class AuthController {
    private userService;
    private jwtService;
    private roleService;
    private authService;
    constructor(userService: UserService, jwtService: JwtService, roleService: RoleService, authService: AuthService);
    register(body: RegisterDto): Promise<any>;
    login(email: string, password: string, response: Response): Promise<any>;
    user(request: Request): Promise<any>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
