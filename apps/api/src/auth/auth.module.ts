import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./local/local.strategy";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { AppConfigService } from "src/config/appConfig.service";

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => {
        const config = configService.get("app");
        return {
          secret: config.jwtSecret,
          signOptions: { expiresIn: config.jwtExpiresIn },
        };
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      useClass: JwtAuthGuard,
      provide: APP_GUARD,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
