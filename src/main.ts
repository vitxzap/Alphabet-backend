import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';
import {
  PrismaClientExceptionFilter,
  PrismaClientValidationFilter,
} from './filters/prisma.filter';
import { APIErrorFilter } from './filters/better-auth.filter';
/* import * as fs from 'fs'; */
async function bootstrap() {
  /*  const httpsOptions = {
    key: fs.readFileSync('src/secrets/localhost+2-key.pem'),
    cert: fs.readFileSync('src/secrets/localhost+2.pem'),
  }; */
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    logger: ['error', 'log', 'warn'],
    /* httpsOptions */
  });
  //Enable CORS
  app.enableCors({
    origin: process.env.UI_URL as string,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  //Configuring swaggerUI
  const config = new DocumentBuilder()
    .setTitle('Project alphabet')
    .setDescription('The alphabet API endpoints description.')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  //using scalar to document the api
  app.use(
    '/api/docs',
    apiReference({ content: documentFactory, theme: 'bluePlanet' }),
  );
  //Using prisma custom filters
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  //Using prisma custom filters
  app.useGlobalFilters(new PrismaClientValidationFilter());
  //Using better auth custom filters
  app.useGlobalFilters(new APIErrorFilter());
  //Listening the server
  await app.listen(process.env.PORT ?? 3050);
  console.warn(`Application is running on port: ${process.env.PORT}`);
}

bootstrap();
