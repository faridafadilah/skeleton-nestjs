import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { Institution } from 'src/master/institution/foundation/entities/institution.entity';

export class DocSchoolReadDTO {
  @AutoMap()
  id?: string;

  @AutoMap()
  @IsString()
  name: string;

  @AutoMap()
  @IsString()
  document: string;

  @AutoMap()
  @IsString()
  startDate: Date;

  @AutoMap()
  @IsString()
  endDate: Date;

  @AutoMap(() => Institution)
  institution: Institution;
}
