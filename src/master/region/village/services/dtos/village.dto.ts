import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';
import { DistrictDTO } from 'src/master/region/district/services/dtos/district.dto';

export class VillageDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  name: string;

  @AutoMap(() => DistrictDTO)
  @IsNotEmpty()
  district: DistrictDTO;
}