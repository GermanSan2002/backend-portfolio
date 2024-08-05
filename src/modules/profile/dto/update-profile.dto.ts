import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty()
  nombre?: string;

  @ApiProperty()
  apellido?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  imageUrl?: string;

  constructor(
    nombre?: string,
    apellido?: string,
    description?: string,
    imageUrl?: string,
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}

export class UpdateProfileWithFileDto extends UpdateProfileDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file?: any;
}
