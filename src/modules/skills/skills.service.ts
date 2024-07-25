import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { Skills } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skills)
    private readonly skillsRepository: Repository<Skills>,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll(): Promise<Skills[]> {
    return this.skillsRepository.find();
  }

  async findOne(id: string): Promise<Skills> {
    const experience = await this.skillsRepository.findOne({
      where: { id },
    });
    if (!experience) {
      throw new NotFoundException(`Experience with ID "${id}" not found`);
    }
    return experience;
  }

  async create(
    createSkillDto: CreateSkillDto,
    fileUrl: string,
  ): Promise<Skills> {
    try {
      const experience = this.skillsRepository.create({
        ...createSkillDto,
        imageSrc: fileUrl,
      });
      return await this.skillsRepository.save(experience);
    } catch (error) {
      console.error('Error creating experience:', error);
      throw new InternalServerErrorException('Failed to create experience');
    }
  }

  async update(
    id: string,
    updateSkillDto: UpdateSkillDto,
    fileUrl?: string,
  ): Promise<Skills> {
    const skill = await this.findOne(id);

    if (fileUrl && skill.imageSrc) {
      await this.imagesService.deleteFile(skill.imageSrc);
      skill.imageSrc = fileUrl;
    }

    Object.assign(skill, updateSkillDto);
    await this.skillsRepository.save(skill);
    return skill;
  }

  async remove(id: string): Promise<void> {
    const skill = await this.findOne(id);
    if (skill.imageSrc) {
      await this.imagesService.deleteFile(skill.imageSrc);
    }
    await this.skillsRepository.remove(skill);
  }
}
