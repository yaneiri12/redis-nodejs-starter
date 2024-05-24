"use client";
import { getProductsByCategory } from "@/app/actions";
import { useCallback, useState } from "react";
import Image from "next/image";

export interface ProductsProps {
  categories: string[];
}

export default function Products({ categories }: ProductsProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<boolean>();

  const formAction = useCallback(async (data: FormData) => {
    setSelectedValue(true);
    setProducts(await getProductsByCategory(data));
  }, []);

  return (
    <>
      <form className="max-w-sm mx-auto" action={formAction}>
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a category to filter products
        </label>
        <select
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
          defaultValue="--Select--"
          id="category"
          name="category"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {!selectedValue && <option>--Select--</option>}
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </form>

      {products.length > 0 && (
        <div className="grid lg:grid-cols-4">
          {products.map((product) => (
            <div className="px-2 py-4">
              <div
                key={product.productId}
                className="max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <Image
                    src={product.styleImages_default_imageURL}
                    alt={product.productDisplayName}
                    width={1800}
                    height={2400}
                    className="w-250 h-auto rounded-t-lg"
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.productDisplayName}
                    </h5>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
