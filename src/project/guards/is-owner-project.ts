import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { ProjectService } from '../project.service';
import { RolesUserInCompany } from '../../types';

@Injectable()
export class IsOwnerProjectGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private projectService: ProjectService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const owner = await this.usersService.find({
      id: request.user.id,
      isOwnerCompany: true,
      roleInCompany: RolesUserInCompany.OWNER,
    });
    if (!owner) {
      throw new BadRequestException('Доступ запрещён. Вы не являетесь владельцем компании');
    }

    const project = await this.projectService.find({
      id: request.params.id,
      companyId: owner.companyId,
    });

    return !!project;
  }
}