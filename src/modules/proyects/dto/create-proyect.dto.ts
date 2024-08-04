import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateProyectDto {
  @ApiProperty({ example: 'Project A' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'projects/project.png', required: false })
  @IsOptional()
  @IsString()
  imageSrc?: string;

  @ApiProperty({
    example:
      'This is a project made to learn the latest languages by building an app.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: ['React', 'Express', 'Node'],
    type: [String],
  })
  @IsArray()
  skills: string[];

  @ApiProperty({ example: 'https://www.example.com', required: false })
  @IsOptional()
  @IsString()
  demo?: string;

  @ApiProperty({ example: 'https://www.github.com', required: false })
  @IsOptional()
  @IsString()
  source?: string;
}

export class CreateProyectWithFileDto extends CreateProyectDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
