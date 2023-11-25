import { AutoMap } from '@automapper/classes';
import { DistrictReadDTO } from 'src/master/region/district/services/dtos/district-read.dto';

export class VillageReadDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap(() => DistrictReadDTO)
  districtId: DistrictReadDTO;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
