import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El campo nombre no debe estar vacío' })
  @IsString({ message: 'El campo nombre debe ser una cadena de texto' })
  name: string;

  @IsNotEmpty({ message: 'El campo apellido no debe estar vacío' })
  @IsString({ message: 'El campo apellido debe ser una cadena de texto' })
  last_name: string;

  @IsNotEmpty({ message: 'El campo email no debe estar vacío' })
  @IsEmail(
    {},
    {
      message:
        'El campo email debe ser una dirección de correo electrónico válida',
    },
  )
  email: string;

  @IsNotEmpty({ message: 'El campo contraseña no debe estar vacío' })
  @IsString({ message: 'El campo contraseña debe ser una cadena de texto' })
  password: string;

  @IsNotEmpty({ message: 'El campo nombre no debe estar vacío' })
  @IsString({ message: 'El campo nombre debe ser una cadena de texto' })
  profile_photo: string;
}
