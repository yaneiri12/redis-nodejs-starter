"use server";

import { decrypt, getSessionCookie } from "@/lib/session";
import { visited } from "@/lib/redis/session";
import * as load from "@/lib/redis/load";
import * as query from "@/lib/redis/query";
import type { AvailableData } from "@/lib/redis/query";
import { revalidatePath } from "next/cache";

export interface Product {
  productId: string;
  styleImages_default_imageURL: string;
  productDisplayName: string;
}

export async function loadProducts() {
  await load.products();

  revalidatePath("/", "page");
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

export async function getAvailableData(): Promise<AvailableData> {
  return query.getAvailableData();
}

export async function getProductCategories() {
  return query.getProductCategories();
}

export async function getProductsByCategory(
  formData: FormData
): Promise<any[]> {
  const result = await query.getProductsByCategory(
    formData.get("category") as string
  );

  let products: any[] = [];

  if (result?.documents.length > 0) {
    products = result.documents.map((doc) => doc.value);
  }

  return JSON.parse(JSON.stringify(products));
}
