import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEducationDto {
  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  readonly education: string;
}
