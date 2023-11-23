import { PartialType } from '@nestjs/mapped-types';
import { YayasanCreateDTO } from './yayasan-create.dto';
import { Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class YayasanUpdateDto extends PartialType(YayasanCreateDTO) {
  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  code: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  address: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  phone: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  province: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  city: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  district: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  village: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  rt: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  rw: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  postal_code: string;

  @ApiProperty()
  @AutoMap()
  @Column({ type: 'varchar' })
  @IsString()
  longlat: string;
}
