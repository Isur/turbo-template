import { Injectable } from "@nestjs/common";

export type User = {
  id: number;
  name: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: Array<User> = [
    { id: 1, name: "John", password: "pass1" },
    { id: 2, name: "Doe", password: "pass2" },
  ];

  getUsers(): Array<User> {
    return this.users;
  }

  async getUser(username: string): Promise<User> {
    return this.users.find((user) => user.name === username);
  }

  createUser(user: User): User {
    this.users.push(user);
    return user;
  }
}
