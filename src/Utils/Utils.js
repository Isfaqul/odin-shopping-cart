export function getCategories(data) {
  let categories = new Set();
  categories.add("all");
  if (data) data.forEach((product) => categories.add(product.category));

  return Array.from(categories);
}

export function limitText(text, count) {
  return text.slice(0, count);
}

export function calcCartItemsCount(cart) {
  let total = 0;
  Array.from(cart).forEach((pr) => {
    total += pr[1].quantity;
  });

  return total;
}

export function calcGrandTotal(cart) {
  let total = 0;

  if (!cart) return total;

  Array.from(cart).forEach((pr) => {
    total += pr[1].quantity * pr[1].price;
  });

  return Math.round(total * 100) / 100;
}

export function roundAmount(amount) {
  return (Math.round(amount * 100) / 100).toFixed(2);
}

export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function filterProductsByCategory(data, category) {
  if (data && category === "all") return data;
  else if (data) {
    return data.filter((product) => product.category === category);
  }
}

function weightedRating({ rate, count }) {
  // Calculate Weighted Rating to Sort by Popularity

  const C = 3.5; // minimum baseline rating
  const M = 200; // minimum vote count to be considered

  const finalRating = (count / (count + M)) * rate + (M / (count + M)) * C;
  return finalRating;
}

export function sortBy(data, category) {
  if (data) {
    let dataCopy = [...data];

    switch (category) {
      case "popularity":
        dataCopy.sort((a, b) => weightedRating(b.rating) - weightedRating(a.rating));
        break;
      case "priceHighToLow":
        dataCopy.sort((a, b) => b.price - a.price);
        break;
      case "priceLowToHigh":
        dataCopy.sort((a, b) => a.price - b.price);
        break;
    }

    return dataCopy;
  }
}
