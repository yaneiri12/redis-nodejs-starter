import { getProductsByCategoryFormAction } from "@/app/actions";
import type { Product } from "@/app/actions";
import Image from "next/image";
import ProductsSelect from "./ProductsSelect";

export interface ProductsProps {
  categories: string[];
  selectedCategory: string | undefined;
  products: Product[];
}

export default function Products({
  products,
  categories,
  selectedCategory,
}: ProductsProps) {
  return (
    <>
      <form
        className="max-w-sm mx-auto"
        action={getProductsByCategoryFormAction}
      >
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a category to filter products
        </label>
        <ProductsSelect
          selectedCategory={selectedCategory}
          categories={categories}
        />
      </form>

      {products.length > 0 && (
        <div className="grid lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.productId} className="px-2 py-4">
              <div className="max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Image
                  src={product.styleImages_default_imageURL}
                  alt={product.productDisplayName}
                  width={1800}
                  height={2400}
                  className="w-250 h-auto rounded-t-lg"
                />
                <div className="p-5">
                  <h5 className="mb-2 text-md tracking-tight text-gray-900 dark:text-white">
                    {product.productDisplayName}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
