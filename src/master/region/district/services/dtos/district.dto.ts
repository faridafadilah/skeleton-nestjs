import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';
import { RegencyDTO } from 'src/master/region/regency/services/dtos/regency.dto';

export class DistrictDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  name: string;

  @AutoMap(() => RegencyDTO)
  @IsNotEmpty()
  regencyId: RegencyDTO;
}
