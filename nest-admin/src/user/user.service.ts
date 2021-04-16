import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./models/user.entity";
import {Repository} from "typeorm";
import {AbstractService} from "../abstract/abstract.service";
import {PaginatedResult} from "../common/paginated-result.interface";

@Injectable()
export class UserService extends AbstractService{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository);

    }


    async paginate(page: number = 1, relations= []): Promise<PaginatedResult> {
        const {data,meta} = await super.paginate(page, relations);

        return {
            data: data.map(user => {
                //removing password from response
                const {password, ...data} = user;
                return data;
            }),
            meta: meta
        }



    }

}
