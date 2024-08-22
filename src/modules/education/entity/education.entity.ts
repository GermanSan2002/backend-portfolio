import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Education extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  education: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
