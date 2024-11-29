import { Injectable } from "@nestjs/common";
import { AppConfigService } from "src/core/config/appConfig.service";

export type User = {
  id: number;
  name: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: Array<User> = [];

  constructor(configService: AppConfigService) {
    const { login, password } = configService.get("auth");
    this.users.push({
      id: 1,
      name: login,
      password,
    });
  }

  getUsers(): Array<User> {
    return this.users;
  }

  async getUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === username);
  }

  createUser(user: User): User {
    this.users.push(user);
    return user;
  }
}
