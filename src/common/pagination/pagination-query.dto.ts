import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Role } from '../../constants/role.enum';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  page: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsEnum([Role.SuperAdmin, Role.User], {
    message: 'El rol debe ser un rol valido',
  })
  role: Role;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  experienceOut: string;
}
