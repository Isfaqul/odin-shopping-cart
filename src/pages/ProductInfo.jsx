import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../dataprovider/DataProvider";
import { limitText, roundAmount } from "../Utils/Utils";
import Ratings from "../components/Ratings";
import WishListButton from "../components/WishListButton";

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(1);
  const { getProductById, addToCart, updateWishListStatus, addToast } = useContext(ProductContext);
  const [descriptionShow, setDescriptionShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const product = getProductById(+params.productId);
  const TEXT_LIMIT = 200;

  function increaseQuantity() {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <main className="main">
      <div className="p-5 h-full flex justify-center items-center">
        <div>
          <button
            type="button"
            className="border-[0.5px] px-3 py-1 bg-neutral-100 active:bg-neutral-50 rounded-sm cursor-pointer"
            onClick={() => navigate(-1)}
          >
            &lt; Go Back
          </button>
          <div className="mt-4 flex-col md:flex-row bg-white w-full max-w-5xl p-5 sm:p-10 border-[0.5px] shadow-2xl flex gap-10 rounded-sm relative">
            <WishListButton onClick={() => updateWishListStatus(product.id)} liked={product.liked} />
            <div className="w-full max-w-48 md:min-w-80 mx-auto">
              <img src={product.image} alt={product.title} className="block w-full mx-auto md:h-96 object-contain" />
            </div>
            <div className="flex flex-col">
              <p className="uppercase text-blue-500 text-xs font-semibold mb-5">{product.category}</p>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <Ratings rating={product.rating.rate} size={18} className="my-5" ratingCount={product.rating.count} />
              <p className="text-neutral-700 uppercase font-bold text-sm mt-2 mb-2">Description</p>
              <div>
                <p className="text-neutral-500 text-sm">
                  {!descriptionShow ? limitText(product.description, TEXT_LIMIT) : product.description}{" "}
                  {product.description.length > TEXT_LIMIT && (
                    <button
                      type="button"
                      className="text-blue-600 cursor-pointer hover:text-neutral-800"
                      onClick={() => setDescriptionShow(!descriptionShow)}
                    >
                      [ {!descriptionShow ? "... expand" : "collapse"} ]
                    </button>
                  )}
                </p>
              </div>
              <h2 className="text-2xl font-bold mt-5 text-blue-500 mb-5">${roundAmount(product.price)}</h2>
              <div className="mt-auto">
                <label htmlFor="infoPageQuantityInput" className="uppercase text-xs font-semibold block mb-5">
                  Quantity
                </label>
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="border bg-neutral-500 text-white px-3 active:bg-neutral-600 cursor-pointer"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      id="infoPageQuantityInput"
                      type="text"
                      className="border block py-1 px-2 w-12 sm:w-16 text-right"
                      value={quantity}
                      onChange={(e) => {
                        if (+e.target.value >= 1 && +e.target.value <= 10) {
                          setQuantity(+e.target.value);
                        } else {
                          alert("Max 10 nos per order & Min 1");
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="border bg-neutral-500 text-white px-3 active:bg-neutral-600 cursor-pointer"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="block ml-auto uppercase text-sm tracking-wider font-semibold bg-neutral-700 text-white px-3 active:bg-neutral-800 cursor-pointer"
                    onClick={() => {
                      addToCart(product, quantity);
                      addToast({
                        text: "Added to Cart",
                        imgSrc: product.image,
                        imgTitle: product.title,
                      });
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
