import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProvinceDTO } from 'src/master/region/province/services/dtos/province.dto';

export class RegencyDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  name: string;

  @AutoMap(() => ProvinceDTO)
  @IsNotEmpty()
  province: ProvinceDTO;
}
