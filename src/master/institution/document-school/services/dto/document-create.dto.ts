/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DocSchoolCreateDTO {
  @AutoMap()
  @ApiProperty()
  startDate: Date;

  @AutoMap()
  @ApiProperty()
  endDate: Date;

  @AutoMap()
  @IsString()
  @ApiProperty()
  schoolId: string;

  @ApiProperty({
    description: 'The file to upload',
    type: 'string',
    format: 'binary',
  })
  file: any;
}