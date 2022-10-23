import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { HttpResponseService } from "src/common/http-response.service";
import { UsersService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UsersService, HttpResponseService],
})
export class UserModule {}
