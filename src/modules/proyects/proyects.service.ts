import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyect } from './entity/proyect.entity';
import { Repository } from 'typeorm';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { ImagesService } from '../images/images.service';

@Injectable()
export class ProyectsService {
  constructor(
    @InjectRepository(Proyect)
    private readonly proyectoRepository: Repository<Proyect>,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll(): Promise<Proyect[]> {
    return this.proyectoRepository.find();
  }

  async findOne(id: string): Promise<Proyect> {
    const proyect = await this.proyectoRepository.findOne({
      where: { id },
    });
    if (!proyect) {
      throw new NotFoundException(`Experience with ID "${id}" not found`);
    }
    return proyect;
  }

  async create(
    createSkillDto: CreateProyectDto,
    fileUrl: string,
  ): Promise<Proyect> {
    try {
      const proyect = this.proyectoRepository.create({
        ...createSkillDto,
        imageSrc: fileUrl,
      });
      return await this.proyectoRepository.save(proyect);
    } catch (error) {
      console.error('Error creating proyect:', error);
      throw new InternalServerErrorException('Failed to create experience');
    }
  }

  async update(
    id: string,
    updateSkillDto: UpdateProyectDto,
    fileUrl?: string,
  ): Promise<Proyect> {
    const proyect = await this.findOne(id);

    if (fileUrl && proyect.imageSrc) {
      await this.imagesService.deleteFile(proyect.imageSrc);
      proyect.imageSrc = fileUrl;
    }

    Object.assign(proyect, updateSkillDto);
    await this.proyectoRepository.save(proyect);
    return proyect;
  }

  async remove(id: string): Promise<void> {
    const proyect = await this.findOne(id);
    if (proyect.imageSrc) {
      await this.imagesService.deleteFile(proyect.imageSrc);
    }
    await this.proyectoRepository.remove(proyect);
  }
}
