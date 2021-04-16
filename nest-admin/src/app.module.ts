import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AbstractService } from './abstract/abstract.service';
import { ProductModule } from './product/product.module';
import { UploadController } from './product/upload.controller';
import { OrderModule } from './order/order.module';
import {APP_GUARD} from "@nestjs/core";
import {PermissionGuard} from "./permission/permission.guard";

@Module({
  imports: [
      UserModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'nodeuser',
        password: 'nodeuser',
        database: 'admin',
          logging: ["query", "error"],
        autoLoadEntities: true,
        synchronize: true}),
      AuthModule,
      CommonModule,
      RoleModule,
      PermissionModule,
      ProductModule,
      OrderModule
    ],
    providers: [
        {provide: APP_GUARD,
        useClass: PermissionGuard}
    ]
})
export class AppModule {}
