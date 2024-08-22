import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Education } from './entity/education.entity';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Education]), AuthModule],
  providers: [EducationService],
  controllers: [EducationController],
})
export class EducationModule {}
