import { useEffect, useContext, useState } from "react";
import { ProductContext } from "../dataprovider/DataProvider";
import ShopPageProductCard from "../components/ShopPageProductCard";
import { toTitleCase, filterProductsByCategory, sortBy } from "../Utils/Utils";
import { IoOptions, IoFilter, IoChevronDownSharp } from "react-icons/io5";

export default function Shop() {
  const { data, error, loading, categories } = useContext(ProductContext);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popularity");
  const currentCategoryProducts = filterProductsByCategory(data, category);
  const productsToDisplay = sortBy(currentCategoryProducts, sort);

  useEffect(() => {
    document.title = "Shop";
  }, []);

  return (
    <main className="main p-5">
      {/* <h1 className="bg-neutral-700 text-neutral-200 p-5 rounded-sm text-center text-3xl mb-5 uppercase font-bold tracking-wider">Products</h1>*/}
      <section className="">
        <section className="rounded-sm mb-5">
          <div className="flex justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <label htmlFor="categories">
                <IoOptions />
              </label>
              <div className="grid">
                <select
                  className="col-start-1 row-start-1 border-[0.5px] rounded-sm px-3 py-1 bg-white appearance-none cursor-pointer"
                  name="category"
                  id="categories"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {toTitleCase(category)}
                    </option>
                  ))}
                </select>
                <IoChevronDownSharp className="pointer-events-none relative right-1 z-10 col-start-1 row-start-1 h-4 w-4 self-center justify-self-end" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="sortOrder">
                <IoFilter />
              </label>
              <div className="grid">
                <select
                  className="col-start-1 row-start-1 border-[0.5px] rounded-sm px-3 py-1 bg-white appearance-none cursor-pointer pr-7"
                  name="sortOrder"
                  id="sortOrder"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                  }}
                >
                  <option value="popularity">Popularity</option>
                  <option value="priceHighToLow">Price High to Low</option>
                  <option value="priceLowToHigh">Price Low to High</option>
                </select>
                <IoChevronDownSharp className="pointer-events-none relative right-1 z-10 col-start-1 row-start-1 h-4 w-4 self-center justify-self-end" />
              </div>
            </div>
          </div>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {loading && <h1>Data Loading...</h1>}
          {error && <h1>{error}</h1>}
          {productsToDisplay &&
            productsToDisplay.map((product) => <ShopPageProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}
