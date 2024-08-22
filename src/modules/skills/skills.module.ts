import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skills } from './entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skills]), AuthModule],
  providers: [SkillsService],
  controllers: [SkillsController],
})
export class SkillsModule {}
