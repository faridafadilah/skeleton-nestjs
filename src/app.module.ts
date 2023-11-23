import { Module } from '@nestjs/common';
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
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
