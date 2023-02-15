import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { Role } from '../../enums/role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const id = user.id;
    console.log('id: ', id);

    // fetch user roles in databse
    const userRoles = await this.userService.findByIdWithRoles(id);
    const roles = userRoles.roles;
    console.log('roles: ', roles);
    console.log('requeiredRoles: ', requiredRoles);
    let isHasPermission = false;
    requiredRoles.forEach((roleRequired) => {
      roles.forEach((role) => {
        if (role.name === roleRequired) {
          isHasPermission = true;
          return;
        }
      });
    });
    return isHasPermission;
  }
}
