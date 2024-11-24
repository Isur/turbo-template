import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";

@Injectable()
export class AppInit implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppInit.name);
  async onApplicationBootstrap() {
    this.logger.log("App Init");
  }
}
