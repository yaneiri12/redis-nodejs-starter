import winston from "winston";
import RedisTransport from "./redis/transport";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  format: winston.format.json(),
  defaultMeta: {},
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new RedisTransport(),
  ],
});

export default logger;
