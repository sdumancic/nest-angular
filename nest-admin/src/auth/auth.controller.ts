import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    NotFoundException,
    Post,
    Req,
    Res, UseGuards, UseInterceptors
} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcryptjs';
import {RegisterDto} from "./models/register.dto";
import {JwtService} from "@nestjs/jwt";
import {Request, Response} from "express";
import {AuthInterceptor} from "./auth.interceptor";
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import {RoleService} from "../role/role.service";

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {


    constructor(private userService: UserService,
                private jwtService: JwtService,
                private roleService: RoleService,
                private authService: AuthService) {
    }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        if (body.password !== body.password_confirm) {
            throw new BadRequestException('Passwords do not match');
        }
        const hashed = await bcrypt.hash(body.password, 12);

        const role = await this.roleService.findOne({name: 'user'});
        if (role === undefined) {
            throw new NotFoundException('Role user does not exist');
        }

        return this.userService.create({
            ...body,
            password: hashed,
            role: {id:role.id}
        });
    }

    @Post('login')
    async login(@Body('email') email: string,
                @Body('password') password: string,
                @Res({passthrough: true}) response: Response) {
        const user = await this.userService.findOne({email: email});
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt',jwt, {httpOnly: true});

        return user;
    }


    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        const id = await this.authService.userId(request);
        return this.userService.findOne({id});
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout( @Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'Success'
        }
    }
}

