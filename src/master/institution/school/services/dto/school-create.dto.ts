/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SchoolCreateDTO {
  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  code: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  address: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  phone: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  province: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  regency: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  district: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  village: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  rt: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  rw: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  postalCode: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  longlat: string;
}
