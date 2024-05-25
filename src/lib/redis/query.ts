import getClient from "./client";
import {
  PRODUCTS_PREFIX,
  SAMPLE_DATA_KEY,
  SEARCH_PRODUCTS_MEMBER,
} from "./config";
import log from "../log";

export interface AvailableData {
  [SEARCH_PRODUCTS_MEMBER]?: boolean;
}

export async function getAvailableData() {
  const redis = await getClient();
  const sampleData = (await redis.sMembers(
    SAMPLE_DATA_KEY,
  )) as (keyof AvailableData)[];

  return sampleData.reduce((hash, member: keyof AvailableData) => {
    hash[member] = true;

    return hash;
  }, {} as AvailableData);
}

const productIndex = `${PRODUCTS_PREFIX}index`;
const categoriesKey = "displayCategories";

export async function getProductCategories() {
  const redis = await getClient();
  let values: string[] = [];

  try {
    values = await redis.ft.tagVals(productIndex, categoriesKey);
  } catch (e) {}

  return values;
}

export async function getProductsByCategory(category: string) {
  log.info(`Getting products for category: ${category}`, {
    location: "@/lib/redis/query/getProductsByCategory",
    meta: {
      category,
    },
  });
  const redis = await getClient();

  return redis.ft.search(
    productIndex,
    `@${categoriesKey}:{${category.replace(/\s/g, "\\ ")}}`,
  );
}
