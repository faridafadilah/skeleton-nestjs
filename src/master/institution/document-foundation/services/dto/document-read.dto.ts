import { AutoMap } from '@automapper/classes';
import { Institution } from 'src/master/institution/foundation/entities/institution.entity';

export class DocFoundationReadDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  document: string;

  @AutoMap()
  startDate: Date;

  @AutoMap()
  originalName: string;

  @AutoMap()
  endDate: Date;

  @AutoMap(() => Institution)
  institution: Institution;
}
