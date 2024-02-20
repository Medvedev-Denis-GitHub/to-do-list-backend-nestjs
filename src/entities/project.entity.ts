import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { UUID } from '../types';
import { Company } from './company.entity';
import { Task } from './task.entity';
import { Length } from 'class-validator';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'uuid' })
  companyId: UUID;

  @ManyToOne(() => Company, company => company.projects)
  @JoinColumn()
  company: Relation<Company>;

  @Column({
    type: 'varchar',
    length: 50,
  })
  @Length(1, 50)
  title: string;

  @Column({
    type: 'varchar',
    length: 1200,
    nullable: true,
  })
  description?: string;

  @OneToMany(() => Task, task => task.project)
  tasks: Relation<Task>[];
}
