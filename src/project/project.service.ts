import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { RequestProjectDto } from './dto/request-project.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../users/users.service';
import { RolesUserInCompany, UUID } from '../types';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private usersService: UsersService,
  ) {}

  async deleteProject(id: UUID) {
    const instance = await this.projectRepository.findOneBy({ id });
    return this.projectRepository.remove(instance);
  }

  async createProject(dto: RequestProjectDto, user: User): Promise<Project> {
    const { company } = await this.usersService.find({
      id: user.id,
      isOwnerCompany: true,
      roleInCompany: RolesUserInCompany.OWNER,
    });

    return this.projectRepository.save({
      ...dto,
      company,
    });
  }

  async updateProject(id: UUID, dto: UpdateProjectDto): Promise<Project> {
    await this.projectRepository.update(id, dto);

    return this.find({ id });
  }

  //todo add type WhereOptions
  find(where: { id?: UUID; companyId?: UUID }): Promise<Project> {
    return this.projectRepository.findOne({ where, relations: ['company', 'tasks'] });
  }
}
