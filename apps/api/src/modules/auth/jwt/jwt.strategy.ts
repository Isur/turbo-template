import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { AppConfigService } from "src/core/config/appConfig.service";
import { JwtPayload } from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: AppConfigService) {
    const config = configService.get("auth");
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (
      req.cookies &&
      "user_token" in req.cookies &&
      req.cookies.user_token.length > 0
    ) {
      return req.cookies.user_token;
    }
    return null;
  }

  async validate(payload: JwtPayload) {
    return { id: payload.payload.id, name: payload.payload.name };
  }
}
