import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); 

  const config = new DocumentBuilder()
    .setTitle('NestJS Ethereum API')
    .setDescription('Encode Bootcamp NestJS Ethereum API Documentatio')
    .setVersion('1.0')
    .addTag('Encode Bootcamp')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
