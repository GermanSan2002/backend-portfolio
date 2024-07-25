import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skills } from './entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skills]), AuthModule, ImagesModule],
  providers: [SkillsService],
  controllers: [SkillsController],
})
export class SkillsModule {}
