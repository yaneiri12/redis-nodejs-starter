"use server";

import * as search from "@/lib/redis/search";

export async function loadProducts() {
  return search.loadProducts();
}
