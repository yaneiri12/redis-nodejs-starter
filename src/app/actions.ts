"use server";

import { decrypt, getSessionCookie } from "@/lib/session";
import type { Session } from "@/lib/redis/session";
import type { Session as CookieSession } from "@/lib/session";
import * as redisSession from "@/lib/redis/session";
import * as load from "@/lib/redis/load";
import * as query from "@/lib/redis/query";
import type { AvailableData } from "@/lib/redis/query";
import { revalidatePath, revalidateTag } from "next/cache";

export interface Product {
  productId: string;
  styleImages_default_imageURL: string;
  productDisplayName: string;
}

export async function loadProducts() {
  await load.products();

  revalidatePath("/");
}

export async function getCookieSession(): Promise<CookieSession | undefined> {
  const sessionCookie = getSessionCookie();

  if (!sessionCookie) {
    return;
  }

  return decrypt(sessionCookie);
}

export async function getVisits(): Promise<number> {
  const session = await getCookieSession();

  if (!session) {
    return 1;
  }

  let visits = 1;

  if (Date.now() - session.timestamp > 200) {
    visits = await redisSession.getVisits(session.id);
  } else {
    visits = await redisSession.visited(session.id);
  }

  return visits;
}

export async function getSessionData(): Promise<Session["data"]> {
  const session = await getCookieSession();

  if (!session) {
    return {};
  }

  const { data } = await redisSession.getSession(session.id);

  return data;
}

export async function getAvailableData(): Promise<AvailableData> {
  return query.getAvailableData();
}

export async function getProductCategories() {
  return query.getProductCategories();
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const result = await query.getProductsByCategory(category);

  let products: any[] = [];

  if (result?.documents.length > 0) {
    products = result.documents.map((doc) => doc.value);
  }

  return JSON.parse(JSON.stringify(products));
}

export async function setSelectedProductCategory(
  formData: FormData,
): Promise<void> {
  const category = formData.get("category") as string;
  const session = await getCookieSession();

  if (!session) {
    return;
  }

  await redisSession.selectedProductCategory(session.id, category);

  revalidatePath("/");
}
