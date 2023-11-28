import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new I18nValidationPipe({ transform: true }));
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  setupSwagger(app);
  await app.listen(3000);
}

bootstrap();
