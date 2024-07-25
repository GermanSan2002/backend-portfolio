import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'history/google.png', required: false })
  @IsOptional()
  @IsString()
  readonly imageSrc?: string;
}

export class CreateSkillWithFileDto extends CreateSkillDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
