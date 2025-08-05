import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { roundAmount } from "../Utils/Utils";
import WishListButton from "./WishListButton";
import { useContext } from "react";
import { ProductContext } from "../dataprovider/DataProvider";

export default function HomePageProductCard({ product }) {
  const { updateWishListStatus } = useContext(ProductContext);

  return (
    <>
      <Link to={`shop/products/${product.id}`}>
        <article className="rounded-md border-[0.5px] border-neutral-400 p-5 bg-white flex flex-col max-h-80 cursor-pointer transition hover:border-neutral-800 relative">
          <WishListButton onClick={() => updateWishListStatus(product.id)} liked={product.liked} />
          <div className="p-5 h-50 min-h-0">
            <img className="w-full h-full object-contain" src={product.image} alt={product.title} />
          </div>
          <div className="flex-grow flex flex-col">
            <h4 className="font-bold flex-grow line-clamp-1">{product.title}</h4>
            <Ratings rating={product.rating.rate} size={14} className="mt-2" ratingCount={product.rating.count} />
            <div className="flex justify-between gap-2 items-center mt-5">
              <p className="text-xl font-bold">${roundAmount(product.price)}</p>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
}
