import { Module } from '@nestjs/common';
import { ProyectsService } from './proyects.service';
import { ProyectsController } from './proyects.controller';
import { Proyect } from './entity/proyect.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Proyect]), AuthModule, ImagesModule],
  providers: [ProyectsService],
  controllers: [ProyectsController],
})
export class ProyectsModule {}
