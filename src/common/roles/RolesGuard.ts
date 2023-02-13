import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    // const user = await this.usersService.findById(userId);
    const user = null;

    if (!user) {
      return false;
    }

    request.roles = user.roles; // Bind the roles to the request object

    return roles.some((role) => user.roles.includes(role));
  }
}
