import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';
import {
  PrismaClientExceptionFilter,
  PrismaClientValidationFilter,
} from './filters/prisma.filter';
import { APIErrorFilter } from './filters/better-auth.filter';
import { ScalarPreferences } from './common/scalar-preferences';
async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bodyParser: false,
  });
  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true, 
  }); //Enable CORS
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder() //Configuring swaggerUI
    .setTitle('Project alphabet')
    .setDescription('The alphabet API endpoints description.')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  app.use(
    '/api/docs',
    apiReference({ content: documentFactory, theme: 'bluePlanet' }),
  ); //using scalar to document the api
  app.useGlobalFilters(new PrismaClientExceptionFilter()); //Using prisma custom filters
  app.useGlobalFilters(new PrismaClientValidationFilter()); //Using prisma custom filters
  app.useGlobalFilters(new APIErrorFilter()); //Using better auth custom filters
  await app.listen(process.env.PORT ?? 3050); //Listening the server
}

bootstrap();
