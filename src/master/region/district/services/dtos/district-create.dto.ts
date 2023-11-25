import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

export class DistrictCreateDTO {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @IsNotEmpty()
  regencyId: number;
}
