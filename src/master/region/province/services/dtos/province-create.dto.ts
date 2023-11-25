import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProvinceCreateDTO {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  name: string;
}
