import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Alphabet prototype')
    .setDescription('The alphabet API description')
    .setVersion('1.0')
    .addTag('testing')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, documentFactory);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
