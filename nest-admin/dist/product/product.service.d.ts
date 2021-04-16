import { AbstractService } from "../abstract/abstract.service";
import { Product } from "./models/product.entity";
import { Repository } from "typeorm";
export declare class ProductService extends AbstractService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
}
