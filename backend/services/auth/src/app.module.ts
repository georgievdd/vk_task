import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import EurekaService from "./service/eureka.service";
import configMiddleware from "./middleware/config.middleware";
import { connectDb } from "./db/instance";
import { User } from "./db/entity/UserEntity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenService } from "./service/token.service";
import { JwtService } from "@nestjs/jwt";
import { RolesGuard } from "./middleware/rolesguard";
import { AuthGuard } from "./middleware/authguard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configMiddleware("auth")],
    }),
    HttpModule,
    connectDb(),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EurekaService,
    TokenService,
    JwtService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class Auth {}
