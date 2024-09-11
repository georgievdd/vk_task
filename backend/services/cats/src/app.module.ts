import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import EurekaService from "./service/eureka.service";
import configMiddleware from "./middleware/config.middleware";
import { connectDb } from "./db/instance";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenService } from "./service/token.service";
import { JwtService } from "@nestjs/jwt";
import { RolesGuard } from "./middleware/rolesguard";
import { AuthGuard } from "./middleware/authguard";
import { APP_GUARD } from "@nestjs/core";
import { Post } from "./db/entity/PostEntity";
import { Like } from "./db/entity/LikeEntity";
import { CatsService } from "./service/cats.service";
import { CatsController } from "./controller/cats.controller";
import { LikeService } from "./service/like.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configMiddleware("cats")],
    }),
    HttpModule,
    connectDb(),
    TypeOrmModule.forFeature([Post, Like]),
  ],
  controllers: [CatsController],
  providers: [
    EurekaService,
    TokenService,
    JwtService,
    AuthGuard,
    CatsService,
    LikeService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class Cats {}
