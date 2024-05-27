import { Controller, Request, Get, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { Public } from "./auth.public";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async profile(@Request() req) {
    return req.user;
  }
}
