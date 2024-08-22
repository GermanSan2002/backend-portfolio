import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Headers,
  UploadedFile,
  UseInterceptors,
  Get,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { ImagesService } from '../images/images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Experience } from '../experiences/entity/experience.entity';
import {
  CreateProfileDto,
  CreateProfileWithFileDto,
} from './dto/create-profile.dto';
import {
  UpdateProfileDto,
  UpdateProfileWithFileDto,
} from './dto/update-profile.dto';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly authService: AuthService,
    private readonly imagesService: ImagesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({
    status: 200,
    description: 'Return profile.',
  })
  findAll() {
    return this.profileService.findOne();
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
    @Body() createProfileWithFileDto: CreateProfileWithFileDto,
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

    const createProfileDto = new CreateProfileDto(
      createProfileWithFileDto.nombre,
      createProfileWithFileDto.apellido,
      createProfileWithFileDto.description,
      createProfileWithFileDto.aboutme,
      fileUrl,
    );

    return this.profileService.create(createProfileDto);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update profile' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'The profile has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Experience not found.' })
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProfileFileDto: UpdateProfileWithFileDto,
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

    const updateProfile = new UpdateProfileDto(
      updateProfileFileDto.nombre,
      updateProfileFileDto.apellido,
      updateProfileFileDto.description,
    );

    let fileUrl: string;
    let fileUpdate: boolean;
    if (file) {
      fileUrl = await this.imagesService.uploadFile(file);
      updateProfile.imageUrl = fileUrl;
      fileUpdate = true;
    } else {
      fileUpdate = false;
    }

    const profile = await this.profileService.update(updateProfile, fileUpdate);

    return profile;
  }
}
