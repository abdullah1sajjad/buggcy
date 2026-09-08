import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: { limit: '50mb' } as any,
  });

  // ── Global prefix ──────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ── Global exception filter (consistent error shape) ──
  app.useGlobalFilters(new HttpExceptionFilter());

  // ── Global interceptors ────────────────────────────
  // NOTE: ResponseInterceptor must be registered BEFORE ClassSerializerInterceptor.
  // Nest runs interceptors on the way out in reverse order, so the serializer
  // (which strips @Exclude() fields like `password`) runs on the raw entity FIRST,
  // and the envelope wrapper runs SECOND.
  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  // ── CORS ───────────────────────────────────────────
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ── Swagger docs ───────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('Corporate Backend API')
    .setDescription('Careers & Blog API with Role-Based Access Control')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Users')
    .addTag('Careers')
    .addTag('Applications')
    .addTag('Blogs')
    .addTag('Services')
    .addTag('Uploads')
    .addTag('Contact')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger docs at http://localhost:${port}/api/docs`);
}

bootstrap();
