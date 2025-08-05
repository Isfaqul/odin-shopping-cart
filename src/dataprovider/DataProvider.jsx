import { useEffect } from "react";
import { createContext, useState } from "react";
import { getCategories, calcCartItemsCount, calcGrandTotal } from "../Utils/Utils";

const ProductContext = createContext(null);

function ProductProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(new Map());
  const [wishlist, setWishList] = useState(new Set());
  const categories = getCategories(data);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Could not fetch products.");

        let products = await response.json();

        products = products.map((product) => ({ ...product, liked: false })); // Add WishList Status

        setData(products);
      } catch (er) {
        console.log(er);
        setData(null);
        setError(er);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  function addToCart(product, qty = 1) {
    let mapCopy = new Map(cart);
    mapCopy.set(
      product.id,
      mapCopy.has(product.id)
        ? { ...product, quantity: mapCopy.get(product.id).quantity + qty }
        : { ...product, quantity: qty }
    );
    setCart(mapCopy);
  }

  function removeItemFromCart(id) {
    let mapCopy = new Map(cart);
    mapCopy.delete(id);
    setCart(mapCopy);
  }

  function getProductById(id) {
    if (!data) return null;
    return data.find((product) => product.id === id);
  }

  function updateQuantity(id, qty) {
    let mapCopy = new Map(cart);
    const currentProduct = mapCopy.get(id);
    currentProduct.quantity = qty;
    setCart(mapCopy);
  }

  function updateWishListStatus(id) {
    let dataCopy = [...data];

    dataCopy = dataCopy.map((product) => {
      if (product.id === id) {
        // Update Wishlist
        if (!product.liked) {
          addToWishList(id);
        } else {
          removeFromWishList(id);
        }

        return { ...product, liked: !product.liked };
      } else {
        return product;
      }
    });

    setData(dataCopy);
  }

  function addToWishList(id) {
    const newSet = new Set(wishlist);
    newSet.add(id);

    setWishList(newSet);
  }

  function deleteFromWishList(id) {
    let dataCopy = [...data];

    dataCopy = dataCopy.map((product) => {
      if (product.id === id) {
        removeFromWishList(id);

        return { ...product, liked: false };
      } else {
        return product;
      }
    });

    setData(dataCopy);
  }

  function removeFromWishList(id) {
    const newSet = new Set(wishlist);
    newSet.delete(id);

    setWishList(newSet);
  }

  function getWishListedProducts(idList) {
    let wishlistedProducts = [];
    wishlist.forEach((id) => {
      wishlistedProducts.push(getProductById(id));
    });

    return wishlistedProducts;
  }

  const totalCartItems = calcCartItemsCount(cart);
  const grandTotalPrice = calcGrandTotal(cart);

  const value = {
    data,
    error,
    loading,
    cart,
    addToCart,
    removeItemFromCart,
    getProductById,
    categories,
    totalCartItems,
    updateQuantity,
    grandTotalPrice,
    updateWishListStatus,
    getWishListedProducts,
    removeFromWishList,
    deleteFromWishList,
  };

  return <ProductContext value={value}>{children}</ProductContext>;
}

export { ProductContext, ProductProvider };
