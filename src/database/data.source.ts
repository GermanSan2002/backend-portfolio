import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from '../modules/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

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
  entities: [UserEntity],
  synchronize: true,
};

export const AppDS = new DataSource(DataSourceConfig);
