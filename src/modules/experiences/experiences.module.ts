import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { Experience } from './entity/experience.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Experience]), AuthModule],
  providers: [ExperiencesService],
  controllers: [ExperiencesController],
})
export class ExperiencesModule {}
