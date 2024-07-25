import { PartialType } from '@nestjs/swagger';
import { CreateExperienceDto } from './create-experience.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {}

export class UpdateExperienceWithFileDto extends UpdateExperienceDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file?: any;
}
