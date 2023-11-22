import { AutoMap } from '@automapper/classes';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class RegisterUserDTO {
  @AutoMap()
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid Email' })
  email: string;

  @AutoMap()
  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;

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
}
