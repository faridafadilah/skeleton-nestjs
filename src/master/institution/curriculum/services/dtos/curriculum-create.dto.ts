import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CurriculumCreateDTO {
  @AutoMap()
  @ApiProperty()
  @IsString({ message: 'validation.IS_STRING' })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsString({ message: 'validation.IS_STRING' })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  code: string;

  @AutoMap()
  @ApiProperty()
  @IsBoolean({ message: 'validation.IS_BOOLEAN' })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  isMajor: boolean;
}
