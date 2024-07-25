import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Experience } from './entity/experience.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { v4 as uuidv4 } from 'uuid';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from 'src/firebase/firebase.config';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async findAll(): Promise<Experience[]> {
    return this.experienceRepository.find();
  }

  async findOne(id: string): Promise<Experience> {
    const experience = await this.experienceRepository.findOne({
      where: { id },
    });
    if (!experience) {
      throw new NotFoundException(`Experience with ID "${id}" not found`);
    }
    return experience;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const storageRef = ref(storage, `images/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file.buffer);
    return await getDownloadURL(snapshot.ref);
  }

  async create(
    createExperienceDto: CreateExperienceDto,
    fileUrl: string,
  ): Promise<Experience> {
    try {
      const experience = this.experienceRepository.create({
        ...createExperienceDto,
        imageSrc: fileUrl,
      });
      return await this.experienceRepository.save(experience);
    } catch (error) {
      console.error('Error creating experience:', error);
      throw new InternalServerErrorException('Failed to create experience');
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file from Firebase:', error);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  async update(
    id: string,
    updateExperienceDto: UpdateExperienceDto,
    fileUrl?: string,
  ): Promise<Experience> {
    const experience = await this.findOne(id);

    if (fileUrl && experience.imageSrc) {
      await this.deleteFile(experience.imageSrc);
      experience.imageSrc = fileUrl;
    }

    Object.assign(experience, updateExperienceDto);
    await this.experienceRepository.save(experience);
    return experience;
  }

  async remove(id: string): Promise<void> {
    const experience = await this.findOne(id);
    if (experience.imageSrc) {
      await this.deleteFile(experience.imageSrc);
    }
    await this.experienceRepository.remove(experience);
  }
}
