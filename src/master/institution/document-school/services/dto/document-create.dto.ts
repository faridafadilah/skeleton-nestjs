/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DocSchoolCreateDTO {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  startDate: Date;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  endDate: Date;

  @AutoMap()
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  @IsString({ message: 'validation.IS_STRING' })
  @ApiProperty()
  schoolId: string;

  @ApiProperty({
    description: 'The file to upload',
    type: 'string',
    format: 'binary',
  })
  file: any;
}
