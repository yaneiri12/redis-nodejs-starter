import path from "path";
import fs from "fs/promises";
import getClient from "./client";
import log from "../log";
import { SAMPLE_DATA_KEY, SEARCH_PRODUCTS_MEMBER } from "./config";

function parseCommand(command: string): string[] {
  const keywords = [
    ".",
    "ON",
    "JSON",
    "PREFIX",
    "SCHEMA",
    "AS",
    "TAG",
    "SEPARATOR",
    "NUMERIC",
    "TEXT",
  ];
  const lastCommandKeywords = ["PREFIX", "SEPARATOR", "NUMERIC", "TEXT"];
  const [cmd, key, ...args] = command
    .split(/\"\s\"/)
    .map((c) => c.replace(/^"/, "").replace(/"$/, ""));

  let last = "";
  return [
    cmd,
    key,
    ...args.map((a) => {
      const l = last;
      last = a;

      if (
        keywords.includes(a) ||
        a.startsWith("$[") ||
        lastCommandKeywords.includes(l)
      ) {
        return a.replace(/\\/g, "");
      }

      try {
        const json = JSON.parse(
          `${a
            .replace(/\\\\\\/g, "\\\\")
            .replace(/\\"/g, '"')
            .replace(/\\x/g, "\\\\x")}`,
        );

        return JSON.stringify(json);
      } catch (e) {}

      return a;
    }),
  ];
}

export async function products() {
  const redis = await getClient();
  const loaded = await redis.sIsMember(SAMPLE_DATA_KEY, SEARCH_PRODUCTS_MEMBER);

  log.debug("Loading products", {
    location: "@/lib/redis/load/loadProducts",
  });

  if (loaded) {
    log.debug("Products already loaded", {
      location: "@/lib/redis/load/loadProducts",
    });
  } else {
    const filePath = path.resolve(process.cwd(), "src/data/products.redis");
    const commandStr = await fs.readFile(filePath, "utf-8");
    const commands = commandStr.split(/\r?\n/).map((c) => c.trim());

    log.debug(`Running ${commands.length} commands to load products`, {
      location: "@/lib/redis/load/loadProducts",
      meta: {
        count: commands.length,
      },
    });

    for (const command of commands) {
      const [cmd, key] = command
        .split(/\"\s\"/)
        .map((c) => c.replace(/^"/, "").replace(/"$/, ""));

      if (cmd.includes("FT.DROPINDEX")) {
        try {
          await redis.sendCommand([cmd, key]);
        } catch (e) {}
      } else {
        await redis.sendCommand(parseCommand(command));
      }
    }

    log.debug("Products loaded", {
      location: "@/lib/redis/load/loadProducts",
    });
    await redis.sAdd(SAMPLE_DATA_KEY, SEARCH_PRODUCTS_MEMBER);
  }
}
