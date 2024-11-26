// my-custom-controller.ts
import { Controller, Get, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrometheusController } from "@willsoto/nestjs-prometheus";
import { Response } from "express";
import { Public } from "src/modules/auth/auth.public";

@ApiTags("monitoring")
@Controller()
export class MetricsController extends PrometheusController {
  @Public()
  @Get()
  async index(@Res({ passthrough: true }) response: Response) {
    return super.index(response);
  }
}
