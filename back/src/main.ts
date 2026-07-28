import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

const allowedOrigins = [
  'http://localhost:3001',
  'http://192.168.1.32:3001',
  'https://gestion-de-gastos-ten.vercel.app',
];
const vercelPreviewOriginRegex = /^https:\/\/gestion-de-gastos-[a-z0-9-]+\.vercel\.app$/;

app.enableCors({
  origin: (origin, callback) => {
    if (!origin) {
      // Permitir solicitudes sin Origin (por ejemplo, herramientas de servidor o CURL).
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin) || vercelPreviewOriginRegex.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy: Origin ${origin} no está permitida.`));
  },
  credentials: true,
});

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Registro Financiero API')
    .setDescription('API para gestionar gastos e ingresos')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
