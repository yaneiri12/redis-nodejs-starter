import {
  getProductCategories,
  getProductsByCategory,
  getSessionData,
  setSelectedProductCategory,
} from "@/app/actions";
import type { Product } from "@/app/actions";
import ProductsSelect from "./ProductsSelect";

export interface ProductsProps {
  categories: string[];
}

async function getData() {
  const session = await getSessionData();
  let products: Product[] = [];

  if (typeof session.selectedProductCategory === "string") {
    products = await getProductsByCategory(session.selectedProductCategory);
  }

  return {
    categories: await getProductCategories(),
    products,
    selectedCategory: session.selectedProductCategory,
  };
}

export default async function Products() {
  const { products, selectedCategory, categories } = await getData();

  return (
    <>
      <form className="max-w-sm mx-auto" action={setSelectedProductCategory}>
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
                {/* eslint-disable-next-line */}
                <img
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
