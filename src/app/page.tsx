"use server";

import { decrypt } from "@/lib/session";
import { getSession, saveSession } from "@/server/redis/session";
import { cookies } from "next/headers";

async function getData() {
  const sessionCookie = cookies().get("session")?.value;

  if (!sessionCookie) {
    return {
      visits: 1,
    };
  }

  const { id } = await decrypt(sessionCookie);
  const session = await getSession(id);

  const visits = (session.data.visits ?? 1) + 1;
  session.data.visits = visits;
  await saveSession(session);

  return {
    visits,
  };
}

export default async function Home() {
  const { visits } = await getData();

  return (
    <main>
      <h1>Visits: {visits}</h1>
    </main>
  );
}
