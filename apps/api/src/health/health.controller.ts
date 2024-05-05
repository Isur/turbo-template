import { Controller, Get } from "@nestjs/common";
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck("internet", "https://google.com"),
      () =>
        this.disk.checkStorage("storage", {
          thresholdPercent: 0.75,
          path: "/",
        }),
      () => this.memory.checkHeap("memory", 512 * 1024 * 1024),
    ]);
  }
}
