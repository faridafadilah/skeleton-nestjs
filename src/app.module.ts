import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/database-exception.filter';
import { dataSourceOptions } from './config/database.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './authentication/user/user.module';
import { AuthModule } from './authentication/auth.module';
import { ProvinceModule } from './master/province/province.module';

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
