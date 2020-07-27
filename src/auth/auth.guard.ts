import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    
    if (!ctx.getInfo()) {
      return true;
    }

    const { fieldName } = ctx.getInfo();

    if (
      [
        'login',
        'register',
      ].includes(fieldName)
    ) {
      // bypass when the fieldName is login or createUser
      return true;
    }

    return super.canActivate(new ExecutionContextHost([req]));
  }
}
