import { IsEmail, IsNotEmpty } from 'class-validator';

export class ReSendCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}