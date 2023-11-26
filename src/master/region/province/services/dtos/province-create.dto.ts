import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';
export class ProvinceCreateDTO {
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  name: string;
}
