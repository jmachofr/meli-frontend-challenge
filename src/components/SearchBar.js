import React from "react";
import "../stylesheets/SearchBar.css";
import * as CONS from "../utils/constants";
import logo from "../assets/Logo_ML@2x.png";
import searchIcon from "../assets/ic_Search@2x.png";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  let navigate = useNavigate();

  const searchAction = () => {
    let query = document.querySelector("input").value;
    if (!query) {
      alert(CONS.TEXT.EMPTY_SEARCHBOX);
    } else {
      let path = CONS.QUERY_PARAMS.SEARCH_QUERY + query;
      navigate(path);
    }
  };

  const goHome = () => {
    let path = "/";
    document.querySelector("input").value = "";
    navigate(path);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchAction();
    }
  };

  return (
    <div className="searchbar__container">
      <div className="searchbar">
        <img className="searchbar__logo" src={logo} alt="meli_logo" onClick={goHome} />
        <div className="searchbar__bar">
          <input
            className="searchbar__input"
            type="text"
            onKeyPress={handleKeyPress}
            placeholder={CONS.TEXT.SEARCHBAR_PLACEHOLDER}
          />
          <input
            className="searchbar__icon"
            onClick={searchAction}
            type="image"
            src={searchIcon}
            alt="search_icon"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
