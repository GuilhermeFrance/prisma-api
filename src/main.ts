import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UnauthorizedInterceptor } from './common/filters/http-exception/errors/interceptors/unauthorized.interceptor';
import { NotFoundInterceptor } from './common/filters/http-exception/errors/interceptors/notfound.interceptor';
import { ConflictInterceptor } from './common/filters/http-exception/errors/interceptors/notfound.interceptor copy';
import { DatabaseInterceptor } from './common/filters/http-exception/errors/interceptors/database.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple blog')
    .setDescription('The Simple Blog API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());

  //app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
