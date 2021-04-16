import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Permission} from "./permission.entity";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [
      CommonModule,
      TypeOrmModule.forFeature([Permission])
  ],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}
