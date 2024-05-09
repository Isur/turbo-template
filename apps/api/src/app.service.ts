import { Injectable } from "@nestjs/common";
import { helloWorld } from "@repo/hello-world-package";

@Injectable()
export class AppService {
  getHello(): string {
    return helloWorld();
  }
}
