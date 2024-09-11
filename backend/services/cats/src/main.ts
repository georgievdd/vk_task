import { NestFactory } from "@nestjs/core";
import { Cats } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Config } from "./middleware/config.middleware";
import { resolveEnv } from "./helpers";
import { CatsService } from "./service/cats.service";
import { defaultPosts } from "./static";

async function bootstrap() {
  const app = await NestFactory.create(Cats);
  const configService = app.get(ConfigService);
  const catsService = app.get(CatsService);
  const config = configService.get<Config>("config");
  await app.listen(resolveEnv(config.server.port));
  console.log(`Application is running on: ${await app.getUrl()}`);
  const cats = await catsService.list(1, 10);
  if (cats.data.length < 10) {
    defaultPosts.forEach((cat) => {
      catsService.create(cat);
    });
  }
}
bootstrap();
