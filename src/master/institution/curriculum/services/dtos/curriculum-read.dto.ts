import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/base/base.entity';

export class CurriculumReadDTO extends BaseEntity {
  @AutoMap()
  name: string;

  @AutoMap()
  code: string;

  @AutoMap()
  isMajor: boolean;
}
