import { NestFactory } from "@nestjs/core";
import { Auth } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Config } from "./middleware/config.middleware";
import { resolveEnv } from "./helpers";

async function bootstrap() {
  const app = await NestFactory.create(Auth);
  const configService = app.get(ConfigService);
  const config = configService.get<Config>("config");
  await app.listen(resolveEnv(config.server.port));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
