import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { apiReference } from '@scalar/nestjs-api-reference';
import {
  PrismaClientExceptionFilter,
  PrismaClientValidationFilter,
} from './filters/prisma.filter';
import { APIErrorFilter } from './filters/better-auth.filter';
import { MyLoggerService } from './logger/logger.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    bufferLogs: true,
  });
  const logger = app.get(MyLoggerService);
  app.useLogger(logger);
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
  //Using prisma custom filters
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  //Using prisma custom filters
  app.useGlobalFilters(new PrismaClientValidationFilter());
  //Using better auth custom filters
  app.useGlobalFilters(new APIErrorFilter());
  //Listening the server
  await app.listen(process.env.PORT ?? 3050);
  logger.log(`"Running on: ${await app.getUrl()}`)
}

bootstrap();