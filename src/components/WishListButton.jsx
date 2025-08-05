import { IoHeartOutline, IoHeart } from "react-icons/io5";

export default function WishListButton({ onClick, liked }) {
  return (
    <button
      type="button"
      className="text-[22px] absolute top-5 right-5 cursor-pointer group"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {liked ? (
        <IoHeart className="text-red-400 group-active:animate-ping" />
      ) : (
        <IoHeartOutline className="text-neutral-400 transition duration-200 group-hover:text-red-400 group-active:animate-ping" />
      )}
    </button>
  );
}
