import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../dataprovider/DataProvider";
import { roundAmount } from "../Utils/Utils";

export default function CartPageProductRow({ product }) {
  const [quantity, setQuantity] = useState(product.quantity);
  const { removeItemFromCart, updateQuantity, addToast } = useContext(ProductContext);

  function increaseQuantity() {
    if (quantity < 10) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-white justify-between gap-2 border-b border-neutral-200 md:items-center p-5 md:p-2">
      <div className="flex flex-col sm:flex-row md:w-2xl justify-start md:items-center">
        <div className="p-2 sm:p-5 w-32">
          <img className="mx-auto w-full object-contain" src={product.image} alt={product.title} />
        </div>
        <div className="p-2 sm:p-5 w-64 lg:w-full">
          <h4 className="text-sm sm:text-md sm:font-semibold mb-2">{product.title}</h4>
          <p className="font-semibold text-sm sm:text-md text-neutral-500">${product.price}</p>
        </div>
        <button
          type="button"
          className="hidden md:block mx-2 bg-red-300 p-1 cursor-pointer rounded-sm active:bg-red-400"
          onClick={() => {
            removeItemFromCart(product.id);
            addToast({
              text: "Removed from Cart",
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
      <div className="w-32 p-2 sm:p-2">
        <div className="mx-auto">
          <label htmlFor="cartQuantityInput" className="text-xs block uppercase font-semibold mb-2 md:hidden">
            Quantity
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              className=" text-xs font-bold bg-neutral-200 text-neutral-500 px-[6px] active:bg-neutral-300 cursor-pointer rounded-sm shadow-xs shadow-black/40"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <input
              id="cartQuantityInput"
              type="text"
              className="border text-sm border-neutral-400 block w-10 px-2 text-right rounded-sm shadow-xs shadow-black/10"
              value={quantity}
              onChange={(e) => {
                const val = +e.target.value;
                if (val >= 1 && val <= 10) {
                  setQuantity(val);
                  updateQuantity(product.id, val);
                } else {
                  alert("Max 10 nos per order & Min 1");
                }
              }}
            />
            <button
              type="button"
              className=" text-xs font-bold bg-neutral-200 text-neutral-500 px-[6px] active:bg-neutral-300 cursor-pointer rounded-sm shadow-xs shadow-black/40"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center p-2 sm:p-5 justify-between">
        <button
          type="button"
          className="md:hidden w-full max-w-16 flex justify-center items-center bg-red-300 p-2 cursor-pointer rounded-sm active:bg-red-400"
          onClick={() => removeItemFromCart(product.id)}
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
        <div className="hidden md:block w-24 text-right">${roundAmount(product.price * product.quantity)}</div>
        <div className="w-36 p-5 text-right md:hidden">
          <span className="font-semibold">Total</span> ${roundAmount(product.price * product.quantity)}
        </div>
      </div>
    </div>
  );
}
