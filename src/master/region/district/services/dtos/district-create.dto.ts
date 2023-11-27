import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DistrictCreateDTO {
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  name: string;

  @AutoMap()
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  @IsNumber({}, { message: 'validation.IS_NUMBEr' })
  regencyId: number;
}
