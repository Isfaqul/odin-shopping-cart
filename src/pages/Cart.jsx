import { useContext, useEffect } from "react";
import { ProductContext } from "../dataprovider/DataProvider";
import CartPageProductRow from "../components/CartPageProductRow";
import { roundAmount } from "../Utils/Utils";

export default function Cart() {
  const { loading, error, cart, grandTotalPrice } = useContext(ProductContext);

  useEffect(() => {
    document.title = "Cart";
  }, []);

  if (loading)
    return (
      <main className="main">
        <h1>Data Loading...</h1>
      </main>
    );

  if (error)
    return (
      <main className="main">
        <h1>{error}</h1>
      </main>
    );

  if (!cart.size)
    return (
      <main className="main flex justify-center items-center text-center">
        <div>
          <p className="text-5xl mb-5">☹️</p>
          <h1 className="text-4xl font-semibold  ">Your cart is empty</h1>
        </div>
      </main>
    );

  return (
    <main className="main">
      <section className="flex px-2 sm:px-5 md:px-10 py-5">
        <div className="w-full">
          <h1 className="text-4xl font-semibold mb-5">Your Cart</h1>
          <div className="">
            <section className="">
              <hgroup className="hidden md:flex justify-between uppercase font-semibold text-sm border-b border-neutral-400 pb-2 gap-2">
                {/* Header */}
                <h2 className="text-center w-2xl">Item(s)</h2>
                <h2 className="text-center w-32">Quantity</h2>
                <h2 className="text-center w-32">Total</h2>
              </hgroup>
              {/* Body */}
              <div>
                {cart && Array.from(cart).map(([id, product]) => <CartPageProductRow key={id} product={product} />)}
              </div>
              {/* Footer */}
              <div className="flex justify-end gap-5">
                <p className="text-right text-xl p-2">Grand Total</p>
                <p className="text-right text-xl font-bold p-2">${roundAmount(grandTotalPrice)}</p>
              </div>
            </section>
          </div>
          <button
            type="button"
            className="bg-neutral-900 text-neutral-100 px-5 mt-5 py-2 uppercase float-right cursor-pointer active:bg-neutral-700"
          >
            Checkout
          </button>
        </div>
      </section>
    </main>
  );
}
