import {IsNotEmpty, isNotEmpty} from "class-validator";

export class UserDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    role_id: number;
}
