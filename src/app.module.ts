import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceConfig } from './database/data.source';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/user/entities/user.entity';
import { Operation } from './modules/user/entities/operation.entity';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { Experience } from './modules/experiences/entity/experience.entity';
import { ImagesModule } from './modules/images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el ConfigModule esté disponible en todo el proyecto sin necesidad de importarlo en cada módulo
      envFilePath: '.env', // Especifica la ruta al archivo .env
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    TypeOrmModule.forFeature([User, Operation, Experience]),
    UserModule,
    AuthModule,
    MailModule,
    ExperiencesModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
