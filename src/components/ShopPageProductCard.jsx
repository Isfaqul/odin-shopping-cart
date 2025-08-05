import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../dataprovider/DataProvider";
import Ratings from "./Ratings";
import WishListButton from "./WishListButton";
import { roundAmount } from "../Utils/Utils";

export default function ShopPageProductCard({ product }) {
  const { addToCart, updateWishListStatus } = useContext(ProductContext);

  return (
    <>
      <Link to={`products/${product.id}`}>
        <article className="rounded-md border-[0.5px] border-neutral-400 p-5 bg-white flex flex-col max-h-84 cursor-pointer transition hover:border-neutral-800 relative">
          <WishListButton onClick={() => updateWishListStatus(product.id)} liked={product.liked} />
          <div className="p-5 h-50 min-h-0">
            <img className="w-full h-full object-contain" src={product.image} alt={product.title} />
          </div>
          <div className="flex-grow flex flex-col">
            <h4 className="font-bold flex-grow line-clamp-1">{product.title}</h4>
            {/*  */}
            <Ratings rating={product.rating.rate} size={14} className="mt-2" ratingCount={product.rating.count} />
            {/*  */}
            <div className="flex justify-between gap-2 items-center mt-5">
              <p className="text-xl font-bold ">${roundAmount(product.price)}</p>
              <button
                className="border bg-neutral-700 px-3 text-neutral-100 text-xs uppercase font-semibold p-2 cursor-pointer hover:bg-neutral-800"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
}
