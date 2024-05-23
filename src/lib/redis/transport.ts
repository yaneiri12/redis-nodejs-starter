import { LEVEL, type MESSAGE, SPLAT } from "triple-beam";
import Transport from "winston-transport";
import getClient from "./client";

interface TransportInfo {
  location: string;
  level: string;
  message: string;
  [LEVEL]: string;
  [MESSAGE]: string;
  [SPLAT]: [any];
}

const stream = process.env.LOG_STREAM ?? "logs";

export default class RedisTransport extends Transport {
  log(info: TransportInfo, callback: () => void) {
    try {
      const level = info[LEVEL];
      let message = info.message;
      let meta = info[SPLAT][0] ?? {};
      const location = meta?.location ?? "unknown";

      if (typeof message !== "string") {
        message = JSON.stringify(message);
      }

      if (typeof meta !== "string") {
        meta = JSON.stringify(meta);
      }

      // Don't await this so the app can keep moving.
      (async () => {
        const redis = await getClient();
        await redis.xAdd(stream, "*", {
          level,
          location,
          message,
          meta,
        });
      })();
    } catch (e) {}

    callback();
  }
}
