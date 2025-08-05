import { useContext, useEffect } from "react";
import { ProductContext } from "../dataprovider/DataProvider";
import WishListProductCard from "../components/WishListProductCard";

export default function Wishlist() {
  const { loading, error, getWishListedProducts } = useContext(ProductContext);
  const wishlistedProducts = getWishListedProducts();

  useEffect(() => {
    document.title = "Wishlist";
  }, []);

  if (loading)
    return (
      <main className="main">
        <h1>Loading data...</h1>
      </main>
    );

  if (error)
    return (
      <main className="main">
        <h1>{error}</h1>
      </main>
    );

  if (!wishlistedProducts.length)
    return (
      <main className="main flex justify-center items-center text-center">
        <div>
          <p className="text-5xl mb-5">💔</p>
          <h1 className="text-4xl font-semibold">Your wishlist is empty</h1>
        </div>
      </main>
    );

  return (
    <main className="main">
      <section className="flex px-2 sm:px-5 md:px-10 py-5">
        <div className="w-full">
          <h1 className="text-4xl font-semibold mb-5">Your Wishlist</h1>
          <div className="">
            <section className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {wishlistedProducts &&
                  wishlistedProducts.map((product) => <WishListProductCard key={product.id} product={product} />)}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
