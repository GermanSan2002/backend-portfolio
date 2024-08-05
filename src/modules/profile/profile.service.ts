import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ImagesService } from '../images/images.service';

@Injectable()
export class ProfileService {
  private profilePath = path.resolve(__dirname, '../../../profile.json');

  constructor(private readonly imagesService: ImagesService) {}

  async create(createProfileDto: CreateProfileDto): Promise<any> {
    const { nombre, apellido, description, imageUrl } = createProfileDto;

    const profile = { nombre, apellido, description, imageUrl };
    this.saveProfileToFile(profile);
    return profile;
  }

  async findOne(): Promise<any> {
    const profile = this.readProfileFromFile();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async update(
    updateProfileDto: UpdateProfileDto,
    newFile: boolean,
  ): Promise<any> {
    const profile = this.readProfileFromFile();

    if (newFile) {
      await this.imagesService.deleteFile(profile.imageSrc);
    }

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const { nombre, apellido, description, imageUrl } = updateProfileDto;

    profile.nombre = nombre ?? profile.nombre;
    profile.apellido = apellido ?? profile.apellido;
    profile.description = description ?? profile.description;
    profile.description = imageUrl ?? profile.description;

    this.saveProfileToFile(profile);
    return profile;
  }

  private readProfileFromFile(): any {
    if (!fs.existsSync(this.profilePath)) {
      return null;
    }
    const profileData = fs.readFileSync(this.profilePath, 'utf-8');
    return JSON.parse(profileData);
  }

  private saveProfileToFile(profile: any): void {
    fs.writeFileSync(
      this.profilePath,
      JSON.stringify(profile, null, 2),
      'utf-8',
    );
  }
}
