import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginAdminDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 12, { message: 'Password has to be at between 6 and 12 chars' })
  public password: string;
}
