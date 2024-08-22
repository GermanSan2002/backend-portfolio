import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { AuthService } from '../auth/auth.service';
import { Education } from './entity/education.entity';

@ApiTags('educations')
@Controller('educations')
export class EducationController {
  constructor(
    private readonly educationsService: EducationService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all educations' })
  @ApiResponse({
    status: 200,
    description: 'Return all educations.',
    type: [Education],
  })
  findAll() {
    return this.educationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get education by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the education with the given id.',
    type: Education,
  })
  @ApiResponse({ status: 404, description: 'Education not found.' })
  findOne(@Param('id') id: string) {
    return this.educationsService.findOne(id);
  }
}
