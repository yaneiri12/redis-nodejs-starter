import getClient from "./client";

export interface Session {
  id: string;
  data: Record<string, any>;
}

const sessionConfig = {
  ttl: 60 * 60 * 24 * 7, // 1 week
  prefix: "session:",
};

export async function getSession(id: string): Promise<Session> {
  const redis = await getClient();
  const key = sessionConfig.prefix + id;
  let data = (await redis.json.get(key)) as Session | null;

  if (!data) {
    data = {
      id,
      data: {},
    };

    await redis.json.set(key, "$", data as any);
  }

  // Refresh the session so it doesn't expire
  await redis.expire(key, sessionConfig.ttl);

  return data;
}

export async function saveSession(session: Session): Promise<void> {
  const redis = await getClient();
  const key = sessionConfig.prefix + session.id;

  await redis.json.set(key, "$", session as any);
  await redis.expire(key, sessionConfig.ttl);
}
