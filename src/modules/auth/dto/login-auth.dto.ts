import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'El email debe ser valido' })
  @IsNotEmpty({ message: 'El campo email no debe estar vacio' })
  email: string;

  @IsNotEmpty({ message: 'El campo contraseña no debe estar vacio' })
  @IsString({ message: 'El campo contraseña es requerido' })
  password: string;
}
