import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from '../../helpers/unique-code.decorator';

export class MasterTypeCreateDTO {
  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  @IsUnique(
    { tableName: 'MasterType', column: 'code' },
    { message: 'validation.IS_UNIQUE' },
  )
  code: string;

  @AutoMap()
  @IsString({ message: 'validation.IS_STRING' })
  @IsNotEmpty({ message: 'validation.IS_NOT_EMPTY' })
  name: string;
}
