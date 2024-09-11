import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { resolveEnv, waitForCondition } from "../helpers";
import { Config } from "../middleware/config.middleware";
import { Post } from "./entity/PostEntity";
import { Like } from "./entity/LikeEntity";

export async function connectDb() {
  return TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      await waitForCondition(() =>
        Boolean(configService.get<Config>("config")),
      );
      const { db } = configService.get<Config>("config");
      return {
        type: "postgres",
        username: resolveEnv(db.username),
        password: resolveEnv(db.password),
        database: resolveEnv(db.database),
        port: +resolveEnv(db.port),
        entities: [Post, Like],
        synchronize: true,
      };
    },
  });
}
