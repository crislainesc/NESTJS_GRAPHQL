import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AccessProfileVerifyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.getContext().req;
    const user = request.user;

    return this.isAdmin(user);
  }

  isAdmin(user): boolean {
    return user.access_profile === 'admin';
  }
}
