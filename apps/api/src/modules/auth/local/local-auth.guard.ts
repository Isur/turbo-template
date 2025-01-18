import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserWithoutPassword } from "../auth.service";
import { UnauthorizedException } from "../auth.errors";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  handleRequest<TUser = UserWithoutPassword>(
    err: any,
    user: TUser,
    info: any,
    _context: ExecutionContext,
    _status?: any
  ): TUser {
    if (err || !user || info) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
