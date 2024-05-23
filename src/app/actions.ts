"use server";

import { decrypt, getSessionCookie } from "@/lib/session";
import { visited } from "@/lib/redis/session";
import * as search from "@/lib/redis/search";

export async function loadProducts() {
  return search.loadProducts();
}

export async function getVisits(): Promise<number> {
  const sessionCookie = getSessionCookie();

  if (!sessionCookie) {
    return 1;
  }

  const { id } = await decrypt(sessionCookie);
  const visits = await visited(id);

  return visits;
}
