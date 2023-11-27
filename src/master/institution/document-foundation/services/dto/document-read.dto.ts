import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
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
  endDate: Date;

  @AutoMap(() => Institution)
  institution: Institution;
}
