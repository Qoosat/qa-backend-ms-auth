import { NestFactory } from "@nestjs/core";

import cookieParser from "cookie-parser";
import { Logger } from "nestjs-pino";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle("Auth API")
    .setDescription("This API for auth")
    .setVersion("1.04")
    .addServer("/", "API server")
    .addBearerAuth()
    .setExternalDoc("Коллекция json", "/swagger-json")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(5500);
}
bootstrap();
