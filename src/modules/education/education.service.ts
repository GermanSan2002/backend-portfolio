import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entity/education.entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
  ) {}

  async findAll(): Promise<Education[]> {
    return this.educationRepository.find();
  }

  async findOne(id: string): Promise<Education> {
    const skill = await this.educationRepository.findOne({
      where: { id },
    });
    if (!skill) {
      throw new NotFoundException(`Education with ID "${id}" not found`);
    }
    return skill;
  }

  async create(createEducationDto: CreateEducationDto): Promise<Education> {
    try {
      const experience = this.educationRepository.create({
        ...createEducationDto,
      });
      return await this.educationRepository.save(experience);
    } catch (error) {
      console.error('Error creating education:', error);
      throw new InternalServerErrorException('Failed to create education');
    }
  }

  async update(
    id: string,
    updateEducationDto: UpdateEducationDto,
  ): Promise<Education> {
    const skill = await this.findOne(id);

    Object.assign(skill, updateEducationDto);
    await this.educationRepository.save(skill);
    return skill;
  }

  async remove(id: string): Promise<void> {
    const skill = await this.findOne(id);
    await this.educationRepository.remove(skill);
  }
}
