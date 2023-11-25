import { AutoMap } from '@automapper/classes';
import { RegencyReadDTO } from 'src/master/region/regency/services/dtos/regency-read.dto';

export class ProvinceReadDTO {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap(() => RegencyReadDTO)
  regencies: RegencyReadDTO[];

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
