import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  Patch,
  Delete,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { AuthService } from '../auth/auth.service';
import { ImagesService } from '../images/images.service';
import { Skills } from './entities/skill.entity';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateSkillWithFileDto } from './dto/create-skill.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateSkillWithFileDto } from './dto/update-skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillsService: SkillsService,
    private readonly authService: AuthService,
    private readonly imagesService: ImagesService,
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

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new skill' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The skill has been successfully created.',
    type: Skills,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSkillDto: CreateSkillWithFileDto,
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

    const fileUrl = await this.imagesService.uploadFile(file);
    return this.skillsService.create(createSkillDto, fileUrl);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
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
    @UploadedFile() file: Express.Multer.File,
    @Body() updateSkillDto: UpdateSkillWithFileDto,
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

    let fileUrl: string;
    if (file) {
      fileUrl = await this.imagesService.uploadFile(file);
    }

    const skill = await this.skillsService.update(id, updateSkillDto, fileUrl);
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
