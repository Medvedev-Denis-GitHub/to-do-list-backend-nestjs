import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from '../types';
import { Company } from './company.entity';
import { Task } from './task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Company, comnany => comnany.projects)
  @JoinColumn()
  company: Company;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 1200,
  })
  description: string;

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];
}
