import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import {
  PrismaClientExceptionFilter,
  PrismaClientValidationFilter,
} from './filters/prisma.filter';
import { APIErrorFilter } from './filters/better-auth.filter';
async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder() //Configuring swaggerUI
    .setTitle('Project alphabet')
    .setDescription('The alphabet API endpoints description.')
    .setVersion('1.0')
    .addCookieAuth('user-session')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, documentFactory); //Starting the swagger Module at v1/docs
  app.enableCors(); //Enable CORS
  app.useGlobalFilters(new PrismaClientExceptionFilter()); //Using filters
  app.useGlobalFilters(new PrismaClientValidationFilter()); //Using filters
  app.useGlobalFilters(new APIErrorFilter()); //Using better auth custom filters
  await app.listen(process.env.PORT ?? 3000); //Listening at the port 3000
}

bootstrap();
