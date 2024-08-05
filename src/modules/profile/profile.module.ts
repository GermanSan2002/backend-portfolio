import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { AuthModule } from '../auth/auth.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [AuthModule, ImagesModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
