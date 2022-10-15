import React, { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import "./SearchBar.scss";
type searchBarProps = {
  searchStr: string;
};

function SearchBar(props: searchBarProps) {
  const navigate = useNavigate();

  const searchRef = useRef<any>(null);
  const searchHandler = async (e: any, iconClicked?: boolean) => {
    const searchVal = searchRef.current.value;
    if (searchVal) {
      if (e.key === "Enter") {
        navigate(`track-search/${searchVal}`);
        window.dispatchEvent(new CustomEvent("clear_track_player"));
      } else if (iconClicked) {
        navigate(`track-search/${searchVal}`);
        window.dispatchEvent(new CustomEvent("clear_track_player"));
      }
    }
  };
  return (
    <span className="searchBar_wrapper">
      <input
        type="text"
        ref={searchRef}
        className="searchBar_input"
        placeholder="Search Track"
        onKeyDown={searchHandler}
      />
      <span className="search_icon" onClick={(e) => searchHandler(e, true)}>
        <BiSearch />
      </span>
    </span>
  );
}

export default React.memo(SearchBar);
