import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
@Entity()
export class Skills extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  imageSrc: string;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
