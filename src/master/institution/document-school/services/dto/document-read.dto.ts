import { AutoMap } from '@automapper/classes';
import { Institution } from 'src/master/institution/foundation/entities/institution.entity';

export class DocSchoolReadDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  document: string;

  @AutoMap()
  startDate: Date;

  @AutoMap()
  endDate: Date;

  @AutoMap()
  originalName: string;

  @AutoMap(() => Institution)
  institution: Institution;
}
