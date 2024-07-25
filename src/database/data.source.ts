import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Operation } from 'src/modules/user/entities/operation.entity';
import { Experience } from 'src/modules/experiences/entity/experience.entity';
import { Skills } from 'src/modules/skills/entities/skill.entity';

ConfigModule.forRoot({
  envFilePath: ['.env'],
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [User, Operation, Experience, Skills],
  synchronize: true,
};

export const AppDS = new DataSource(DataSourceConfig);
