import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from '../types';
import { Project } from './project.entity';
import { User } from './user.entity';

export enum TrackersTask {
  ERROR = 'error',
  IMPROVEMENT = 'improvement',
}

export enum StatusTask {
  NEW = 'new',
  IN_WORKING = 'in_working',
  CLOSED = 'closed',
}

export enum TaskPriorities {
  lOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  IMMEDIATE = 'immediate',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Project, project => project.tasks)
  @JoinColumn()
  project: Project;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn()
  assigned: User;

  @Column({
    type: 'enum',
    enum: TrackersTask,
    default: TrackersTask.ERROR,
  })
  tracker: TrackersTask;

  @Column({
    type: 'enum',
    enum: StatusTask,
    default: StatusTask.NEW,
  })
  status: StatusTask;

  @Column({
    type: 'enum',
    enum: TaskPriorities,
    default: TaskPriorities.NORMAL,
  })
  priority: TaskPriorities;

  @Column({
    type: 'varchar',
    length: 100,
  })
  theme: string;

  @Column({
    type: 'varchar',
    length: 1200,
  })
  description: string;

  @Column()
  release: Date;

  @Column()
  latestUpdate: Date;

  @Column()
  deadline: Date;
}
