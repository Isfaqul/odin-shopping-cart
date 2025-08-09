import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { ProductContext } from "../dataprovider/DataProvider";
import { IoMenu, IoClose, IoCartOutline, IoHeartOutline } from "react-icons/io5";

export default function NavBar({ onClick }) {
  const { totalCartItems } = useContext(ProductContext);

  return (
    <nav className="flex justify-between items-center uppercase tracking-wide gap-5 ">
      <Link to="/">
        <h2 className="font-extrabold normal-case text-xl">SazCart</h2>
      </Link>
      <button className="bg-neutral-200 px-3 py-2 cursor-pointer sm:hidden rounded-sm" onClick={onClick}>
        <IoMenu />
      </button>
      <ul className="hidden sm:flex gap-5">
        <li className="nav-link">
          <NavLink to="/" className={({ isActive }) => (isActive ? "font-semibold border-b" : "")}>
            Home
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="shop" className={({ isActive }) => (isActive ? "font-semibold border-b" : "")}>
            Shop
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink
            to="wishlist"
            className={({ isActive }) =>
              isActive ? "font-semibold border-b flex items-center gap-2" : "flex items-center gap-2"
            }
          >
            <IoHeartOutline className="text-xl" />
            <span className="block">Wishlist</span>
          </NavLink>
        </li>
      </ul>
      <ul className="hidden sm:flex items-center gap-5">
        <li className="nav-link relative">
          <NavLink
            to="cart"
            className={({ isActive }) =>
              isActive ? "flex items-center gap-1 font-semibold border-b" : "flex items-center gap-1"
            }
          >
            <IoCartOutline className="text-xl" />
            Cart
            {totalCartItems > 0 ? (
              <span className="text-xs bg-red-700 text-white rounded-full px-2 py-1 relative bottom-[2px]">
                {totalCartItems}
              </span>
            ) : (
              <span></span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export function SideNav({ onClick }) {
  const { totalCartItems } = useContext(ProductContext);

  return (
    <nav className="bg-white absolute z-20 top-0 left-0 bottom-0 right-0 h-dvh">
      <hgroup className="flex items-center gap-2 p-5">
        <h2 className="font-extrabold normal-case text-xl tracking-wide">PixMart</h2>
        <button
          className="block bg-neutral-200 px-3 py-2 cursor-pointer sm:hidden ml-auto rounded-sm"
          onClick={onClick}
        >
          <IoClose />
        </button>
      </hgroup>

      <ul className="flex flex-col text-center">
        <li className="nav-link" onClick={onClick}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-neutral-200 w-full font-bold block py-5 border-y-[0.5px]"
                : "bg-neutral-100 w-full block py-3"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-link" onClick={onClick}>
          <NavLink
            to="shop"
            className={({ isActive }) =>
              isActive
                ? "bg-neutral-200 w-full font-bold block py-5 border-y-[0.5px]"
                : "bg-neutral-100 w-full block py-3"
            }
          >
            Shop
          </NavLink>
        </li>
        <li className="nav-link" onClick={onClick}>
          <NavLink
            to="wishlist"
            className={({ isActive }) =>
              isActive
                ? " bg-neutral-200 w-full font-bold py-5 border-y-[0.5px] flex items-center gap-2 justify-center group"
                : "bg-neutral-100 w-full flex items-center gap-2 py-3 text-center justify-center"
            }
          >
            <IoHeartOutline className="text-xl" />
            <span className="block">Wishlist</span>
          </NavLink>
        </li>
        <li className="nav-link relative" onClick={onClick}>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              isActive
                ? "bg-neutral-200 w-full font-bold py-5 border-y-[0.5px] flex items-center justify-center gap-1"
                : "bg-neutral-100 w-full py-3 flex items-center justify-center gap-1 "
            }
          >
            <IoCartOutline className="text-xl block" />
            Cart{" "}
            {totalCartItems > 0 ? (
              <span className="text-xs bg-red-700 text-white rounded-full px-2 py-1 relative bottom-[2px]">
                {totalCartItems}
              </span>
            ) : (
              ""
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
