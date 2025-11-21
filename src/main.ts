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
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  //Globals
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useGlobalFilters(new PrismaClientValidationFilter());
  app.useGlobalFilters(new APIErrorFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.UI_URL || 'http://localhost:3000',
    credentials: true,
  });

  //Documentation
  const config = new DocumentBuilder()
    .setTitle('Project alphabet')
    .setDescription('The alphabet API endpoints description.')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  
  //using scalar to document the api
  app.use(
    '/api/reference',
    apiReference({
      sources: [
        {
          url: '/api/reference',
          title: 'API',
          slug: 'api',
          content: documentFactory,
          default: true,
        },
        {
          url: '/api/auth/open-api/generate-schema',
          title: 'Auth',
          slug: 'auth',
        },
      ],
      theme: 'kepler',
    }),
  );

  await app.listen(process.env.PORT ?? 3050);
}

bootstrap();