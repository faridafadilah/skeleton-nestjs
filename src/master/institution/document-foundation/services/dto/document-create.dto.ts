/* eslint-disable prettier/prettier */
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocFondationDTO {
  @AutoMap()
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  @ApiProperty()
  startDate: Date;

  @AutoMap()
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  @ApiProperty()
  endDate: Date;

  @AutoMap()
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  @IsString({ message: 'validation.IS_STRING' })
  @ApiProperty()
  foundationId: string;

  @ApiProperty({
    description: 'The file to upload',
    type: 'string',
    format: 'binary',
  })
  file: any;
}
