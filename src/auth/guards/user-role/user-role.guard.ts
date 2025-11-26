import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector,
  ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler() );

    console.log('UserRoleGuard ejecutándose');
    console.log('Valid roles:', validRoles);

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    console.log('User:', user);

    if(!user) throw new Error('User not found');

    console.log('User roles:', user.roles);

    for (const role of user.roles) {
      if(validRoles.includes(role)) {
        console.log(`Role ${role} is valid, access granted`);
        return true;
      }
    }

    console.log('No valid role found, access denied');
    throw new ForbiddenException(`User ${user.fullName} need a valid role: [${validRoles}] to access this resource`);
  }
}
