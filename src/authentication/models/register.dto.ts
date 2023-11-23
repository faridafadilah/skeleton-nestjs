import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enum/role.enum';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class RegisterUserDTO {
  @ApiProperty()
  @AutoMap()
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid Email' })
  email: string;

  @ApiProperty()
  @AutoMap()
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain a minimum of 8 and a maximum of 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number, and 
    one special character`,
  })
  password: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  phone: string;

  @AutoMap()
  @ApiProperty({ enum: Role, enumName: 'Role' })
  @IsNotEmpty()
  @IsEnum(Role, { message: 'Invalid role' })
  role: Role;
}
