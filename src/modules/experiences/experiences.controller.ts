import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  Headers,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExperiencesService } from './experiences.service';
import { Experience } from './entity/experience.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateExperienceWithFileDto } from './dto/create-experience.dto';
import { AuthService } from '../auth/auth.service';
import { UpdateExperienceWithFileDto } from './dto/update-experience.dto';
import { ImagesService } from '../images/images.service';

@ApiTags('experiences')
@Controller('experiences')
export class ExperiencesController {
  constructor(
    private readonly experiencesService: ExperiencesService,
    private readonly authService: AuthService,
    private readonly imagesService: ImagesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all experiences' })
  @ApiResponse({
    status: 200,
    description: 'Return all experiences.',
    type: [Experience],
  })
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get experience by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the experience with the given id.',
    type: Experience,
  })
  @ApiResponse({ status: 404, description: 'Experience not found.' })
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new experience' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The experience has been successfully created.',
    type: Experience,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createExperienceDto: CreateExperienceWithFileDto,
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
    return this.experiencesService.create(createExperienceDto, fileUrl);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update experience by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The experience has been successfully updated.',
    type: Experience,
  })
  @ApiResponse({ status: 404, description: 'Experience not found.' })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateExperienceDto: UpdateExperienceWithFileDto,
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

    const experience = await this.experiencesService.update(
      id,
      updateExperienceDto,
      fileUrl,
    );
    return experience;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete experience by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'The experience has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Experience not found.' })
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

    await this.experiencesService.remove(id);
  }
}
