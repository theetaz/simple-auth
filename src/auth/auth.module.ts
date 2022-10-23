import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entity/user.entity";
import { AuthController } from "./auth.controller";
import { AuthHelper } from "./auth.helper";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./auth.strategy";
import { ConfigModule } from "@nestjs/config";
import { HttpResponseService } from "src/common/http-response.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt", property: "user" }),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, HttpResponseService, AuthHelper, JwtStrategy],
})
export class AuthModule {}
