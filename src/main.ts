import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  
  const config = new DocumentBuilder()
    .setTitle("Api de gatitos")
    .setDescription("Mi primera api de nestjs")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup("docs", app, document);


   app.enableCors();



  await app.listen(parseInt(process.env.PORT) || 8000);

}
bootstrap();
