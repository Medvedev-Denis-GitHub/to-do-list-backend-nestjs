import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from '../types';
import { Company } from './company.entity';

//todo Более подробные комм-и
export enum RolesUserInCompany {
  OWNER = 'owner' /* Владелец компании */,
  ADMIN = 'admin' /* Создание задач, назначение задач и тд */,
  MEMBER = 'member' /* Просто участник, трудозатраты, редактирование задачи */,
  NONE = 'none',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 25,
  })
  firstname: string;

  @Column({
    type: 'varchar',
    length: 25,
  })
  lastName: string;

  @Column()
  password: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isOwnerCompany: boolean;

  @ManyToOne(() => Company, company => company.users)
  company: Company;

  @Column({
    type: 'enum',
    enum: RolesUserInCompany,
    default: RolesUserInCompany.NONE,
  })
  roleInCompany: RolesUserInCompany;
}
