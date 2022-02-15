import Product from "../components/Product";

export const priceFormater = (price) => {
  let sign = price.currency === "ARS" ? "$" : "U$S";
  let finalPrice = price.amount
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${sign} ${finalPrice}`;
};

export const categoriesFormatter = (categories) => {
  return categories.map((a) => a).join(" > ");
};

export const renderProducts = (items) => {
  return items.items.map((product, idx) => {
    return (
      <div key={idx}>
        <Product
          id={product.id}
          title={product.title}
          picture={product.picture}
          price={priceFormater(product.price)}
          decimals={product.price.decimals}
          state={product.state}
          shipping={product.free_shipping}
        />
      </div>
    );
  });
};
