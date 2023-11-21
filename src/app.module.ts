import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './master/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/database-exception.filter';
import { dataSourceOptions } from './config/database.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { RegionModule } from './master/region/region.module';
import { CountryModule } from './master/country/country.module';
import { CompanyModule } from './master/company/company.module';
import { ConfigModule } from '@nestjs/config';

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
    RegionModule,
    CountryModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
