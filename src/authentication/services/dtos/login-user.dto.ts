import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDTO {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @Length(6, 12, { message: 'Password has to be at between 6 and 12 chars' })
  public password: string;
}
