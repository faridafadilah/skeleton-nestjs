import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegencyCreateDTO {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @IsNotEmpty()
  @IsNumber()
  provinceId: number;
}
