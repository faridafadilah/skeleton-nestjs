import { AutoMap } from '@automapper/classes';
import { RegencyReadDTO } from 'src/master/region/regency/services/dtos/regency-read.dto';
import { VillageReadDTO } from 'src/master/region/village/services/dtos/village-read.dto';

export class DistrictReadDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap(() => RegencyReadDTO)
  regencyId: RegencyReadDTO;

  @AutoMap(() => VillageReadDTO)
  villages: VillageReadDTO[];

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
