import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';
import * as pkg from '../package.json';

async function bootstrap() {
  // @todo change `cors` accordingly
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
