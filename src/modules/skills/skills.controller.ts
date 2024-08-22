import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  UnauthorizedException,
  Patch,
  Delete,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { AuthService } from '../auth/auth.service';
import { Skills } from './entities/skill.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all skills' })
  @ApiResponse({
    status: 200,
    description: 'Return all skills.',
    type: [Skills],
  })
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get skill by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the skill with the given id.',
    type: Skills,
  })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new skill' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token' })
  @ApiBody({ type: CreateSkillDto })
  @ApiResponse({
    status: 201,
    description: 'The skill has been successfully created.',
  })
  @Post()
  async createNote(
    @Body() createNoteDto: CreateSkillDto,
    @Headers('authorization') authorization: string,
  ): Promise<Skills> {
    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authorization.replace('Bearer ', '');

    const decoded = await this.authService.verifyToken(token, false);

    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    return this.skillsService.create(createNoteDto);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update skill by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The skill has been successfully updated.',
    type: Skills,
  })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
    @Headers('authorization') authorization: string,
  ) {
    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authorization.replace('Bearer ', '');
    const decoded = await this.authService.verifyToken(token);

    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    const skill = await this.skillsService.update(id, updateSkillDto);
    return skill;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete skill by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'The skill has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Skill not found.' })
  async remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authorization.replace('Bearer ', '');
    const decoded = await this.authService.verifyToken(token);

    if (!decoded) {
      throw new UnauthorizedException('Invalid token');
    }

    await this.skillsService.remove(id);
  }
}
