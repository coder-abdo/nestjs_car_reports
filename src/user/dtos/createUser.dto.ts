import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
