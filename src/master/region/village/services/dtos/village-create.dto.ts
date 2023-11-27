import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VillageCreateDTO {
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  name: string;

  @AutoMap()
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  @IsNumber({}, { message: 'validation.IS_NUMBER' })
  districtId: number;
}
