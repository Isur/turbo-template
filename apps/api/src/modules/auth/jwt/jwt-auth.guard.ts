import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { IS_PUBLIC_KEY } from "../auth.public";
import { UnauthorizedException } from "../auth.errors";
import { JwtPayloadData } from "./jwt.payload";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = JwtPayloadData>(
    err: any,
    user: TUser,
    _info: any,
    _context: ExecutionContext,
    _status?: any
  ): TUser {
    if (err || !user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
