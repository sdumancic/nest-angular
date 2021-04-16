import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import {UserModule} from "../user/user.module";
import {CommonModule} from "../common/common.module";
import { AuthService } from './auth.service';
import {RoleModule} from "../role/role.module";


@Module({
  imports: [
      forwardRef(()=> UserModule),
      forwardRef(()=> RoleModule),
      CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
