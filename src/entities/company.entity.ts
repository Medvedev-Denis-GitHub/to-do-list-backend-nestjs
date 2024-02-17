import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { UUID } from '../types';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Length } from 'class-validator';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 25,
    unique: true,
  })
  @Length(5, 25)
  tag: string;

  @Column({
    type: 'varchar',
    length: 1200,
    nullable: true,
  })
  description?: string;

  @Column({ type: 'uuid', unique: true })
  ownerId: UUID;

  @OneToOne(() => User, user => user.company)
  @JoinColumn()
  owner: Relation<User>;

  @OneToMany(() => User, user => user.company)
  users: Relation<User>[];

  @OneToMany(() => Project, project => project.company)
  projects: Relation<Project>[];
}
