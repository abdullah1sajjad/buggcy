import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MODULE_KEY } from '../../common/enums/module.decorator';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const moduleKey = this.reflector.getAllAndOverride<string>(MODULE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!moduleKey) return true;

    const { user } = context.switchToHttp().getRequest();
    if (user?.role === Role.ADMIN) return true;

    if (!user?.permissions?.includes(moduleKey)) {
      throw new ForbiddenException(`Access denied. HR lacks permission for module: ${moduleKey}`);
    }
    return true;
  }
}