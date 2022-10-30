import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // must be added in order to use validation pipes
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Todo-NestJS')
    .setDescription(
      'This is backend for ToDo App. \n\n Do not forget to Register/Login first in order to get the auth token.',
    )
    .setVersion('1.0')
    .addTag('Todo API')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
