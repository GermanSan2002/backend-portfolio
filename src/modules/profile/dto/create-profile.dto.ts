import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellido: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  aboutme: string;

  @ApiProperty()
  imageUrl: string;

  constructor(
    nombre: string,
    apellido: string,
    description: string,
    aboutme: string,
    imageUrl: string,
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.imageUrl = imageUrl;
    this.description = description;
    this.aboutme = aboutme;
  }
}

export class CreateProfileWithFileDto extends CreateProfileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
