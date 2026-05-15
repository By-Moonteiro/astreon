import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import scalarReference from '@scalar/fastify-api-reference';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined, // Em produção manda json puro pro render
      },
    }),
  );

  const configService = app.get(ConfigService);

  await app.register(fastifyCookie);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: [
      configService.get<string>('FRONTEND_URL') ?? 'https://astreon.app',
      'http://localhost:5173',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Astreon')
    .setDescription('Docs for Astreon Project')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  await app.register(scalarReference, {
    routePrefix: '/docs',
    configuration: {
      content: document,
      theme: 'deepSpace',
    },
  });

  const port = configService.get<number>('PORT')!;
  await app.listen(port, '0.0.0.0');
}

bootstrap().catch(console.error);
