import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Headers,
  UnauthorizedException,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { AuthService } from '../auth/auth.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Proyect } from './entity/proyect.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProyectWithFileDto } from './dto/create-proyect.dto';
import { ImagesService } from '../images/images.service';
import { UpdateProyectWithFileDto } from './dto/update-proyect.dto';

@ApiTags('proyectos')
@Controller('proyects')
export class ProyectsController {
  constructor(
    private readonly proyectosService: ProyectsService,
    private readonly authService: AuthService,
    private readonly imagesService: ImagesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all proyects' })
  @ApiResponse({
    status: 200,
    description: 'Return all proyects.',
    type: [Proyect],
  })
  findAll() {
    return this.proyectosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get proyect by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the proyect with the given id.',
    type: Proyect,
  })
  @ApiResponse({ status: 404, description: 'Proyect not found.' })
  findOne(@Param('id') id: string) {
    return this.proyectosService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create a new proyect' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The proyect has been successfully created.',
    type: Proyect,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSkillDto: CreateProyectWithFileDto,
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
    return this.proyectosService.create(createSkillDto, fileUrl);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update proyect by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The proyect has been successfully updated.',
    type: Proyect,
  })
  @ApiResponse({ status: 404, description: 'Proyect not found.' })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateSkillDto: UpdateProyectWithFileDto,
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

    const proyect = await this.proyectosService.update(
      id,
      updateSkillDto,
      fileUrl,
    );
    return proyect;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete proyect by id' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'The proyect has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Proyect not found.' })
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

    await this.proyectosService.remove(id);
  }
}
