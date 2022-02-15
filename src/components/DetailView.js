import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useLocation } from "react-router-dom";
import * as CONS from "../utils/constants";
import "../stylesheets/DetailView.css";
import { priceFormater } from "../utils/utils";
import axios from "axios";

function DetailView() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState([]);

  useLocation();

  useEffect(() => {
    let currentURL = window.location.href;
    let product = currentURL.substring(currentURL.lastIndexOf("/") + 1);
    let apiURL =
      CONS.ENDPOINTS.BASE_SERVER +
      CONS.ENDPOINTS.SEARCH_DETAIL_SERVER +
      product;

    async function getItemDetails() {
      try {
        const result = await axios(apiURL);
        setDetails(result.data);
        setIsLoaded(true);
      } catch (err) {
        setError(err);
      }
    }
    getItemDetails();
  }, []);

  if (error) {
    console.log(details);
    return (
      <div>
        {CONS.TEXT.ERROR}
        {error.message}
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div className="loading__gif">
        <ReactLoading
          type={"spin"}
          color={"black"}
          height={"100px"}
          width={"100px"}
        />
      </div>
    );
  } else {
    return (
      <div>
        <p className="categories__text"></p>
        <div className="detailCointaner">
          <div className="first__row">
            <img src={details.item.picture} alt={details.item.id}></img>
            <div className="detail__info">
              <p className="state__sold">{`${
                details.item.condition === "new"
                  ? CONS.TEXT.NEW
                  : CONS.TEXT.USED
              } - ${details.item.sold_quantity} ${CONS.TEXT.SOLD} `}</p>
              <p className="detail__title">{details.item.title}</p>
              <p className="detail__price">
                {priceFormater(details.item.price)}
                {details.item.price.decimals ? (
                  <span className="price__decimals">
                    {details.item.price.decimals}
                  </span>
                ) : null}
              </p>
              <button>Comprar</button>
            </div>
          </div>
          <div className="detail__description">
            <p className="description__title">{CONS.TEXT.DESCRIPTION_TITLE}</p>
            <p className="description__text">{details.item.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailView;
