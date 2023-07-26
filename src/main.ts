import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from "express";
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 
  app.use(express.static("."));


  // cho FE truy cập
  app.use(cors(
    { origin: ["http://localhost:3000"]}
  ));
  await app.listen(8080);

}
bootstrap();