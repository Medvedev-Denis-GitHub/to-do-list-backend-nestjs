import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RolesUserInCompany, UUID } from '../types';
import { Company } from './company.entity';

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
  lastname: string;

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
