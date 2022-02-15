import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import * as CONS from "../utils/constants";
import { useLocation } from "react-router-dom";
import "../stylesheets/SearchList.css";
import { categoriesFormatter, renderProducts } from "../utils/utils";
import axios from "axios";

function SearchList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useLocation();

  let currentURL = window.location.href;
  let query = currentURL.substring(currentURL.indexOf("=") + 1);

  useEffect(() => {
    let apiURL =
      CONS.ENDPOINTS.BASE_SERVER + CONS.ENDPOINTS.SEARCH_QUERY_SERVER + query;
    console.log(apiURL);
    async function getItems() {
      try {
        setIsLoaded(false);
        const result = await axios(apiURL);
        setItems(result.data);
        setIsLoaded(true);
      } catch (err) {
        setError(err);
      }
    }

    getItems();
  }, [query]);

  if (error) {
    return <div>Error: {error.message}</div>;
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
  } else if (Object.keys(items.items).length === 0) {
    return <div className="no__results">{CONS.TEXT.NO_PRODUCTS}</div>;
  } else {
    return (
      <div>
        {
          <p className="categories__text">
            {categoriesFormatter(items.categories)}
          </p>
        }
        <div className="products__list">{renderProducts(items)}</div>
      </div>
    );
  }
}

export default SearchList;
