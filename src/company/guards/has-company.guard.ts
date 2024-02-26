import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { RolesUserInCompany } from '../../types';

@Injectable()
export class HasCompanyGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.usersService.find({
      id: request.user.id,
      isOwnerCompany: true,
      roleInCompany: RolesUserInCompany.OWNER,
    });

    return !!user;
  }
}