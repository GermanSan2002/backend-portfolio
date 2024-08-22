import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty()
  nombre?: string;

  @ApiProperty()
  apellido?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  aboutme?: string;

  @ApiProperty()
  imageUrl?: string;

  constructor(
    nombre?: string,
    apellido?: string,
    description?: string,
    aboutme?: string,
    imageUrl?: string,
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.description = description;
    this.imageUrl = imageUrl;
    this.aboutme = aboutme;
  }
}

export class UpdateProfileWithFileDto extends UpdateProfileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file?: any;
}
