import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class ProvinceDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  @IsString()
  name: string;
}
