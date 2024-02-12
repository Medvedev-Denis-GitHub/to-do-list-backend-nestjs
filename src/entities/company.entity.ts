import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from '../types';
import { User } from './user.entity';
import { Project } from './project.entity';

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
    length: 1200,
  })
  description: string;

  @OneToOne(() => User, user => user.company)
  @JoinColumn()
  owner: User;

  @OneToMany(() => User, user => user.company)
  users: User[];

  @OneToMany(() => Project, project => project.company)
  projects: Project[];
}
