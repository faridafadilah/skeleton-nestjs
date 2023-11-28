import { AutoMap } from '@automapper/classes';

export class MasterTypeReadDTO {
  @AutoMap()
  id: string;

  @AutoMap()
  typeName: string;

  @AutoMap()
  code: string;

  @AutoMap()
  name: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
