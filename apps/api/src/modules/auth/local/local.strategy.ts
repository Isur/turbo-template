import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService, UserWithoutPassword } from "../auth.service";
import { UnauthorizedException } from "../auth.errors";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: "login", passwordField: "password" });
  }

  async validate(
    login: string,
    password: string
  ): Promise<UserWithoutPassword> {
    const validated = await this.authService.validateUser(login, password);

    if (!validated) {
      throw new UnauthorizedException();
    }

    return validated;
  }
}
