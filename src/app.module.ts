import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './config/database.config';
import { UserModule } from './authentication/user/user.module';
import { AuthModule } from './authentication/auth.module';
import { ProvinceModule } from './master/region/province/province.module';
import { ResponseInterceptor } from './client/request';
import { RegencyModule } from './master/region/regency/regency.module';
import { FoundationModule } from './master/institution/foundation/foundation.module';
import { DistrictModule } from './master/region/district/district.module';
import { VillageModule } from './master/region/village/village.module';
import { DocumentFoundationModule } from './master/institution/document-foundation/document-foundation.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { LoggerMiddleware } from './common/logger/logger.middleware';
import { SchoolModule } from './master/institution/school/school.module';
import { DocumentSchoolModule } from './master/institution/document-school/document-school.module';
import { CurriculumModule } from './master/institution/curriculum/curriculum.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    AuthModule,
    ProvinceModule,
    FoundationModule,
    RegencyModule,
    DistrictModule,
    VillageModule,
    DocumentFoundationModule,
    DocumentSchoolModule,
    SchoolModule,
    CurriculumModule,
    I18nModule.forRoot({
      fallbackLanguage: 'id',
      loaderOptions: {
        path: join(__dirname, '/common/locale/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public/uploads/'),
      serveRoot: '/public/uploads/',
      exclude: ['/api*'],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
