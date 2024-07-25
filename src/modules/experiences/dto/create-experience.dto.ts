import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty({ example: 'Software Engineer' })
  @IsString()
  readonly role: string;

  @ApiProperty({ example: 'Google' })
  @IsString()
  readonly organisation: string;

  @ApiProperty({ example: 'Sept, 2022' })
  @IsString()
  readonly startDate: string;

  @ApiProperty({ example: 'Present' })
  @IsString()
  readonly endDate: string;

  @ApiProperty({
    example: ['Worked on Google Maps', 'Reduced load times by 50%'],
    type: [String],
  })
  @IsArray()
  readonly experiences: string[];

  @ApiProperty({ example: 'history/google.png' })
  @IsString()
  readonly imageSrc: string;
}

export class CreateExperienceWithFileDto extends CreateExperienceDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
