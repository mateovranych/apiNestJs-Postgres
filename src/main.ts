import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  //Que se admitan los dto
      forbidNonWhitelisted: true, //Que lo rebote al usuario si me quiere mandar cualquier cosa
      transform: true,
    })
  );



  await app.listen(3000);
}
bootstrap();
