import { AutoMap } from '@automapper/classes';
import { DistrictReadDTO } from 'src/master/region/district/services/dtos/district-read.dto';

export class RegencyReadDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap(() => DistrictReadDTO)
  districts: DistrictReadDTO[];

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
