import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constants/cors';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CORS);
  app.setGlobalPrefix('api/v1');

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const NODE_ENV = configService.get<string>('NODE_ENV');

  await app.listen(PORT).then(() => {
    Logger.log(`Running on port: ${PORT}`, NestApplication.name);
    Logger.log(`Current environment: ${NODE_ENV}`, NestApplication.name);
  });
}
bootstrap();
