import { useContext } from "react";
import { createPortal } from "react-dom";
import { ProductContext } from "../dataprovider/DataProvider";

export function Toasts() {
  const { getToasts } = useContext(ProductContext);
  let toasts = getToasts();

  return createPortal(
    <div className="z-[1000] fixed top-0 right-0 p-2 flex flex-col gap-2">
      {toasts &&
        toasts.map((toast) => (
          <Toast key={toast.id} text={toast.text} type={toast.type} imgSrc={toast.imgSrc} imgTitle={toast.imgTitle} />
        ))}
    </div>,
    document.body
  );
}

export function Toast({ imgSrc, imgTitle, text, type = "green" }) {
  const types = {
    green: "bg-neutral-50 border-l-8 border-lime-500 shadow-md px-3 py-2 rounded-xs animate-slide-in",
    red: "bg-neutral-50 border-l-8 border-red-500 shadow-md px-3 py-2 rounded-xs animate-slide-in",
  };

  return (
    <article className={types[type]}>
      <div className="flex gap-2 items-center">
        <img src={imgSrc} alt={imgTitle} className="w-4 h-4 object-contain" />
        <p>{text}</p>
      </div>
    </article>
  );
}
