import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellido: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageUrl: string;

  constructor(
    nombre: string,
    apellido: string,
    description: string,
    imageUrl: string,
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.imageUrl = imageUrl;
    this.description = description;
  }
}

export class CreateProfileWithFileDto extends CreateProfileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
