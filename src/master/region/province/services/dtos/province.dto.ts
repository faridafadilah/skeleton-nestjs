import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProvinceDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  name: string;
}
