import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get,
    Param,
    Post, Put, Query, Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./models/user.entity";
import * as bcrypt from 'bcryptjs';
import {UserDto} from "./models/user.dto";
import {AuthGuard} from "../auth/auth.guard";
import {EditUserDto} from "./models/edit-user.dto";
import {AuthService} from "../auth/auth.service";
import {Request} from 'express';
import {HasPermission} from "../permission/has-permission.decorator";

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {


    constructor(private userService: UserService,
                private authService: AuthService) {
    }

    @Get()
    @HasPermission('view_users')
    async all(@Query('page') page:number = 1){
        return this.userService.paginate(page, ['role']);
    }

    @Post()
    async create(@Body() body: UserDto): Promise<User> {
        const password = await bcrypt.hash('1234',12);
        const {role_id, ...data}  = body;

        return this.userService.create({
            ...data,
            password: password,
            role: {id: role_id}
        });
    }

    @Get(':id')
    async get(@Param('id') id:number) {
        return this.userService.findOne({id}, ['role']);
    }

    @Put('info')
    async updateInfo(
        @Req() request: Request,
        @Body() body: EditUserDto){
        const id = await this.authService.userId(request);
        await this.userService.update(id, body);
        return this.userService.findOne({id});
    }

    @Put('password')
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') passwordConfirm: string){

        if (password !== passwordConfirm) {
            throw new BadRequestException('Passwords do not match');
        }
        const id = await this.authService.userId(request);

        const hashed = await bcrypt.hash(password,12);


        await this.userService.update(id, {password});
        const one = this.userService.findOne({id});

        return one;
    }

    @Put(':id')
    async update(@Param('id') id:number,
                 @Body() body: EditUserDto) {
        const {role_id, ...data} = body;
        console.log('body = ', body);
        console.log('role_id = ', role_id);
        await this.userService.update(id, {
            ...data,
            role: {id: role_id}
        });
        return this.userService.findOne({id});
    }

    @Delete(':id')
    async delete(@Param('id') id:number) {
        return this.userService.delete(id);
    }
}
