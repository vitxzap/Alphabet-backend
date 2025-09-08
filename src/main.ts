import { NestFactory } from '@nestjs/core';
import { MainModule } from './modules/main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {
  PrismaClientExceptionFilter,
  PrismaClientValidationFilter,
} from './filters/prisma.filter';
import { ForbiddendFilter } from './filters/filter';
async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Project alphabet')
    .setDescription('The alphabet API description.')
    .setVersion('1.0')
    .addTag('testing')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, documentFactory);
  app.enableCors();
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useGlobalFilters(new PrismaClientValidationFilter());
  app.useGlobalFilters(new ForbiddendFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
