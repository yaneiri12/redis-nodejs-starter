import log from "../log";
import getClient from "./client";

export interface Session extends Record<string, any> {
  id: string;
  data: Record<string, any>;
}

const sessionConfig = {
  ttl: 60 * 60 * 24 * 7, // 1 week
  prefix: "session:",
};

export async function getSession(sessionId: string): Promise<Session> {
  const redis = await getClient();
  const key = sessionConfig.prefix + sessionId;
  let data = (await redis.json.get(key)) as Session | null;

  if (!data) {
    data = {
      id: sessionId,
      data: {},
    };

    await redis.json.set(key, "$", data);
  }

  // Refresh the session so it doesn't expire
  await redis.expire(key, sessionConfig.ttl);

  return data;
}

export async function getVisits(sessionId: string): Promise<number> {
  const redis = await getClient();
  const key = sessionConfig.prefix + sessionId;
  const keys = await redis.json.objKeys(key, ".data");
  let visits = 1;

  if (Array.isArray(keys) && keys.some((k) => k === "visits")) {
    visits = (await redis.json.get(key, {
      path: ".data.visits",
    })) as number;
  }

  return visits;
}

export async function visited(sessionId: string): Promise<number> {
  const redis = await getClient();
  const key = sessionConfig.prefix + sessionId;
  const keys = await redis.json.objKeys(key, ".data");
  let visits = 1;

  if (Array.isArray(keys) && keys.some((k) => k === "visits")) {
    visits = (await redis.json.numIncrBy(key, ".data.visits", 1)) as number;
  } else if (keys === null) {
    await getSession(sessionId);
    await redis.json.set(key, ".data.visits", visits);
  } else {
    await redis.json.set(key, ".data.visits", visits);
  }

  log.info(`New visit from session: ${sessionId}`, {
    location: "@/lib/redis/session/visited",
    meta: {
      sessionId,
      visits,
    },
  });

  return visits;
}

export async function selectedProductCategory(
  sessionId: string,
  category: string,
): Promise<void> {
  const redis = await getClient();
  const key = sessionConfig.prefix + sessionId;

  await redis.json.set(key, ".data.selectedProductCategory", category);
}

export async function saveSession(session: Session): Promise<void> {
  const redis = await getClient();
  const key = sessionConfig.prefix + session.id;

  await redis.json.set(key, "$", session);
  await redis.expire(key, sessionConfig.ttl);
}
