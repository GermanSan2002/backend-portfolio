import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSkillDto } from './create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}

export class UpdateSkillWithFileDto extends UpdateSkillDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file?: any;
}
