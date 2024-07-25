import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Experience extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  role: string;

  @Column()
  organisation: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column('simple-array')
  experiences: string[];

  @Column()
  imageSrc: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
