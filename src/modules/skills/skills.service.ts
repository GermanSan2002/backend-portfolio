import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skills } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skills)
    private readonly skillsRepository: Repository<Skills>,
  ) {}

  async findAll(): Promise<Skills[]> {
    return this.skillsRepository.find();
  }

  async findOne(id: string): Promise<Skills> {
    const skill = await this.skillsRepository.findOne({
      where: { id },
    });
    if (!skill) {
      throw new NotFoundException(`skill with ID "${id}" not found`);
    }
    return skill;
  }

  async create(createSkillDto: CreateSkillDto): Promise<Skills> {
    try {
      const experience = this.skillsRepository.create({
        ...createSkillDto,
      });
      return await this.skillsRepository.save(experience);
    } catch (error) {
      console.error('Error creating experience:', error);
      throw new InternalServerErrorException('Failed to create experience');
    }
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skills> {
    const skill = await this.findOne(id);

    Object.assign(skill, updateSkillDto);
    await this.skillsRepository.save(skill);
    return skill;
  }

  async remove(id: string): Promise<void> {
    const skill = await this.findOne(id);
    await this.skillsRepository.remove(skill);
  }
}
