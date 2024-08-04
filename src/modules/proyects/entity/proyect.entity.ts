import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Proyect extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  imageSrc: string;

  @Column()
  description: string;

  @Column('simple-array')
  skills: string[];

  @Column({ nullable: true })
  demo: string;

  @Column({ nullable: true })
  source: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
