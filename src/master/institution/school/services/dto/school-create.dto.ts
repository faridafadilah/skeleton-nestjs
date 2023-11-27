/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SchoolCreateDTO {
  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  code: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  address: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  phone: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  province: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  regency: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  district: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  village: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  rt: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  rw: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  postalCode: string;

  @ApiProperty()
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  longlat: string;
}
