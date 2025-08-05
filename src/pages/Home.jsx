import { Link, NavLink } from "react-router";
import HomePageProductCard from "../components/HomePageProductCard";
import { ProductContext } from "../dataprovider/DataProvider";
import { useContext, useEffect } from "react";

export default function Home() {
  const { data, loading, error } = useContext(ProductContext);

  useEffect(() => {
    document.title = "SazCart Home";
  }, []);

  return (
    <main className="main">
      <section className="hero-bg h-96 flex items-center justify-center flex-col">
        <h1 className="text-6xl  text-neutral-50 text-center text-shadow-lg">
          Welcome to <strong>SazCart</strong>
        </h1>
        <Link
          to="shop"
          className="text-neutral-50 mt-5 border px-5 py-2 bg-neutral-800 text-lg hover:[box-shadow:0px_1px_1px_rgba(255,255,255,1)]"
        >
          Start Shopping
        </Link>
      </section>
      <section className="py-2 px-5 md:px-10">
        <h2 className="text-4xl font-semibold text-center my-10">New Arrivals</h2>
        {loading && <h3>Loading products...</h3>}
        {error && <h3>Could not fetch products, please try again.</h3>}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-10">
          {data && data.slice(5, 10).map((product) => <HomePageProductCard product={product} key={product.id} />)}
        </div>
      </section>
    </main>
  );
}
