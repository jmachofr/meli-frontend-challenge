import React from "react";
import * as CONS from "../utils/constants";
import "../stylesheets/Product.css";
import shippinglogo from "../assets/ic_shipping.png";

function Product({ id, title, picture, price, decimals, state, shipping }) {
  const redirect = () => {
    window.location.href = CONS.QUERY_PARAMS.DETAIL_QUERY + id;
  };

  return (
    <div className="product">
      <img src={picture} alt={id}></img>
      <div className="product__info">
        <p className="product__price">
          {price}
          {decimals ? (
            <span className="list__price__decimals">{decimals}</span>
          ) : null}
          <img
            className="shipping__img"
            src={shippinglogo}
            alt='shipping__img'
            style={{ display: !shipping ? "none" : "" }}
          />
        </p>
        <a className="product__title" onClick={() => redirect()}>
          {title}
        </a>
      </div>
      <div className="product__location">
        <p className="product__city">{state}</p>
      </div>
    </div>
  );
}

export default Product;
