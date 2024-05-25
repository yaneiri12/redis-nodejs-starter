"use client";

interface SelectProps {
  selectedCategory: string | undefined;
  categories: string[];
}

export default function Select({ categories, selectedCategory }: SelectProps) {
  return (
    <select
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
      value={selectedCategory}
      id="category"
      name="category"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      {!selectedCategory && <option>--Select--</option>}
      {categories.map((category) => {
        return (
          <option key={category} value={category}>
            {category}
          </option>
        );
      })}
    </select>
  );
}
