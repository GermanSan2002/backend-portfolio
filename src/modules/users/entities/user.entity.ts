import { BaseEntity } from '../../../database/base.entity';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../../../constants/role.enum';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Exclude()
  @Column()
  password: string;

  @Column({
    nullable: true,
    default: 'https://delocals-images.s3.amazonaws.com/default_image.png',
  })
  profile_photo: string;
}
