import { useContext } from "react";
import { ProductContext } from "../dataprovider/DataProvider";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { roundAmount } from "../Utils/Utils";

export default function WishListProductCard({ product }) {
  const { deleteFromWishList, addToast } = useContext(ProductContext);

  return (
    <>
      <Link to={`/shop/products/${product.id}`}>
        <article className="rounded-md border-[0.5px] border-neutral-400 p-5 bg-white flex flex-col max-h-84 cursor-pointer transition hover:border-neutral-800 relative">
          <div className="p-5 h-50 min-h-0 mb-2">
            <img className="w-full h-full object-contain" src={product.image} alt={product.title} />
          </div>
          <div className="flex-grow flex flex-col">
            <h4 className="font-bold flex-grow line-clamp-1">{product.title}</h4>
            <Ratings rating={product.rating.rate} size={14} className="mt-2" ratingCount={product.rating.count} />
            <div className="flex justify-between gap-2 items-center mt-5">
              <p className="text-xl font-bold">${roundAmount(product.price)}</p>
              <button
                type="button"
                className="mx-2 bg-red-300 p-1 cursor-pointer rounded-sm active:bg-red-400"
                onClick={(e) => {
                  e.preventDefault();
                  deleteFromWishList(product.id);
                  addToast({
                    text: "Removed from Wishlist",
                    type: "red",
                    imgSrc: product.image,
                    imgTitle: product.title,
                  });
                }}
              >
                <svg
                  width="18px"
                  height="18px"
                  viewBox="-2.4 -2.4 28.80 28.80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {"{&quot; &quot;}"}
                  <path
                    d="M4 6h16l-1.58 14.22A2 2 0 0116.432 22H7.568a2 2 0 01-1.988-1.78L4 6z"
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {"{&quot; &quot;}"}
                  <path
                    d="M7.345 3.147A2 2 0 019.154 2h5.692a2 2 0 011.81 1.147L18 6H6l1.345-2.853z"
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {"{&quot; &quot;}"}
                  <path d="M2 6h20" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  {"{&quot; &quot;}"}
                  <path d="M10 11v5" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  {"{&quot; &quot;}"}
                  <path d="M14 11v5" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  {"{&quot; &quot;}"}
                </svg>
              </button>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
}
