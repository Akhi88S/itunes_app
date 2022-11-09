import React, { useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { types } from "../../Redux/types";
import "./SearchBar.scss";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { tracksReadOnlyData } = useAppSelector(
    (state: any) => state.tracksReducer
  );

  const searchRef = useRef<any>(null);

  const searchHandler = async (e: any, iconClicked?: boolean) => {
    const searchVal = iconClicked ? searchRef.current.value : e.target.value;
    if (searchVal || iconClicked) {
      const filteredTracks = tracksReadOnlyData.filter((track: any) => {
        return track?.title?.label
          ?.toLowerCase()
          ?.includes(searchVal.toLowerCase());
      });
      //filtered tracks(search)
      dispatch({ type: types.GET_TRACKS, payload: filteredTracks });
    } else {
      //get all tracks
      dispatch({ type: types.GET_TRACKS, payload: tracksReadOnlyData });
    }
  };
  return (
    <span className="searchBar_wrapper">
      {location.pathname !== "/all-favorites" && (
        <>
          <input
            type="text"
            ref={searchRef}
            className="searchBar_input"
            placeholder="Search Track"
            onKeyUp={searchHandler}
          />
          <span className="search_icon" onClick={(e) => searchHandler(e, true)}>
            <BiSearch />
          </span>
        </>
      )}
    </span>
  );
}

export default React.memo(SearchBar);
