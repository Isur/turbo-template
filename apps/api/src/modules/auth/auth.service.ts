import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User, UsersService } from "../users/users.service";
import { JwtPayloadData } from "./jwt/jwt.payload";
import { UnauthorizedException } from "./auth.errors";

export type UserWithoutPassword = Omit<User, "password">;

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async validateUser(
    login: string,
    password: string
  ): Promise<UserWithoutPassword> {
    const user = await this.usersService.getUser(login);

    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }

    const { id, name } = user;

    return { id, name };
  }

  async login(user: UserWithoutPassword) {
    const { id, name } = user;

    const payload: JwtPayloadData = {
      id,
      name,
    };

    return {
      access_token: this.jwtService.sign({ sub: id, payload }),
    };
  }
}
