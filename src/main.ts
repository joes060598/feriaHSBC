import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {readFileSync} from 'fs'

async function bootstrap() {
  const httpsOptions = {
    key: readFileSync('./secrets/key.key.pem'),
    cert: readFileSync('./secrets/certificate.cert.pem'),
      }

  const app = await NestFactory.create(AppModule, { httpsOptions,cors: true });
  const config = new DocumentBuilder()
    .setTitle('Feria HSBC')
    .setDescription('The HSBC API description')
    .setVersion('1.0')
    .addTag('HSBC')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: '*',
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    credentials: true,
    });
  await app.listen(4000);
  //so
}
bootstrap();