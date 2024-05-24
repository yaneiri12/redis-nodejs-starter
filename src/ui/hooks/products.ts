import useSWR from "swr";
import fetcher from "./fetcher";

export function useProductCategories() {
  const { data, error, isLoading } = useSWR(
    "/api/products/categories",
    fetcher
  );

  return {
    categories: (data?.categories ?? []) as string[],
    isLoading,
    isError: error,
  };
}
