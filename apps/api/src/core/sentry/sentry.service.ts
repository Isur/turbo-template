import { Injectable } from "@nestjs/common";
import { AppConfigService } from "src/core/config/appConfig.service";

@Injectable()
export class SentryService {
  private readonly sentryHost: string;
  private readonly sentryProjectIds: string[];

  constructor(configService: AppConfigService) {
    const sentryConfig = configService.get("sentry");
    this.sentryHost = sentryConfig.host;
    this.sentryProjectIds = sentryConfig.projects;
  }

  async tunnel(body: string) {
    const envelope = body;
    const piece = envelope.split("\n")[0];
    if (!piece) {
      throw new Error("Piece not exists, invalid envelope!");
    }
    const header = JSON.parse(piece);
    const dsn = new URL(header["dsn"]);
    const project_id = dsn.pathname?.replace("/", "");

    if (dsn.hostname !== this.sentryHost) {
      throw new Error(
        `Invalid sentry hostname: ${dsn.hostname}, expected: ${this.sentryHost}`
      );
    }

    if (!project_id || !this.sentryProjectIds.includes(project_id)) {
      throw new Error(`Invalid sentry project id: ${project_id}`);
    }

    const upstream_sentry_url = `https://${this.sentryHost}/api/${project_id}/envelope/`;
    await fetch(upstream_sentry_url, { method: "POST", body: envelope });

    return {};
  }
}
