import { AutoMap } from '@automapper/classes';
import { IsOptional, IsString } from 'class-validator';

export class MasterTypeUpdateDTO {
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  @IsOptional({ message: 'validation.IS_OPTIONAL' })
  code: string;

  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  @IsOptional({ message: 'validation.IS_OPTIONAL' })
  name: string;
}
