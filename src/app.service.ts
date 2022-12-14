import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  startedAt: Date = new Date();

  getStatus(): object {
    return {
      startedAt: this.startedAt,
      name: "hub_delivery_api",
      env: process.env.stage,
      debugDb: process.env.DB_RUN_LOCAL,
      suffixDb: process.env.DB_TABLE_SUFFIX
    }
  }
}