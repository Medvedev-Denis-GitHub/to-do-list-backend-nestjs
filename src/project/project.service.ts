import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { RequestProjectDto } from './dto/request-project.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  createCompany(dto: RequestProjectDto, user: User) {
    console.log(user);
  }
}
