import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Res,
  Delete,
} from "@nestjs/common";
import { AppConfigService } from "src/config/appConfig.service";
import { LocalAuthGuard } from "./local/local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { Public } from "./auth.public";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: AppConfigService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const { jwtExpiresIn } = this.configService.get("app");
    const { access_token } = await this.authService.login(req.user);

    res.cookie("user_token", access_token, {
      expires: new Date(Date.now() + jwtExpiresIn),
    });

    return { access_token };
  }

  @Delete("logout")
  async logout(@Res({ passthrough: true }) res) {
    res.clearCookie("user_token");
    return { message: "Logout success" };
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  async profile(@Request() req) {
    return req.user;
  }
}
