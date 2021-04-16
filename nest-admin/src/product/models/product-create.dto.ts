import {IsNotEmpty} from "class-validator";

export class ProductCreateDto {
    @IsNotEmpty()
    title: string;
    description: string;
    image: string;

    @IsNotEmpty()
    price: number;
}
