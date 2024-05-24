"use server";

import { decrypt, getSessionCookie } from "@/lib/session";
import type { Session } from "@/lib/redis/session";
import {
  getSession,
  selectedProductCategory,
  visited,
} from "@/lib/redis/session";
import * as load from "@/lib/redis/load";
import * as query from "@/lib/redis/query";
import type { AvailableData } from "@/lib/redis/query";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface Product {
  productId: string;
  styleImages_default_imageURL: string;
  productDisplayName: string;
}

export async function loadProducts() {
  await load.products();

  revalidatePath("/", "page");
}

export async function getSessionId(): Promise<string | undefined> {
  const sessionCookie = getSessionCookie();

  if (!sessionCookie) {
    return;
  }

  const { id } = await decrypt(sessionCookie);

  return id;
}

export async function getVisits(): Promise<number> {
  const sessionId = await getSessionId();

  if (!sessionId) {
    return 1;
  }

  const visits = await visited(sessionId);

  return visits;
}

export async function getSessionData(): Promise<Session["data"]> {
  const sessionId = await getSessionId();

  if (!sessionId) {
    return {};
  }

  const session = await getSession(sessionId);

  return session.data;
}

export async function getAvailableData(): Promise<AvailableData> {
  return query.getAvailableData();
}

export async function getProductCategories() {
  return query.getProductCategories();
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const result = await query.getProductsByCategory(category);

  let products: any[] = [];

  if (result?.documents.length > 0) {
    products = result.documents.map((doc) => doc.value);
  }

  return JSON.parse(JSON.stringify(products));
}

export async function getProductsByCategoryFormAction(
  formData: FormData
): Promise<Product[]> {
  const category = formData.get("category") as string;
  const sessionId = (await getSessionId()) as string;

  const [, products] = await Promise.all([
    selectedProductCategory(sessionId, category),
    getProductsByCategory(category),
  ]);

  revalidatePath("/", "page");

  return products;
}
