import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProyectDto } from './create-proyect.dto';

export class UpdateProyectDto extends PartialType(CreateProyectDto) {}

export class UpdateProyectWithFileDto extends UpdateProyectDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file?: any;
}
