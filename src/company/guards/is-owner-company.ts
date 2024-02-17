import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class IsOwnerCompanyGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.usersService.find({
      id: request.user.id,
      companyId: request.params.id,
      isOwnerCompany: true,
    });


    return !!user;
  }
}