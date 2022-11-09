import React, { useEffect, useState } from "react";
import { getTracks } from "../../Redux/actions/tracksActions";

import Tile from "../../utils/TileComponent/TileComponent";
import TrackInfo from "../../utils/TrackInfo/TrackInfo";

import ComponentLoader from "../../utils/Loader/component.loader";
import { types } from "../../Redux/types";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { useLocation } from "react-router-dom";

function Tracks({ removeLoaderHandler }: any) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { tracks, tracksReadOnlyData } = useAppSelector(
    (state: any) => state.tracksReducer
  );
  const [detailedInfo, setDetailedInfo] = useState({ data: {}, show: false }); //track detailed info
  const [favoritesFound, setfavoritesFound] = useState(-1);

  useEffect(() => {
    if (!tracksReadOnlyData.length) {
      setIsLoading(true);
      dispatch(getTracks())
        .then((tracksData: any) => {
          setIsLoading(false);
          removeLoaderHandler && removeLoaderHandler("tracks");
        })
        .catch((err: any) => {
          console.log("err", err);
          setIsLoading(false);
          removeLoaderHandler && removeLoaderHandler("tracks");
        });
    } else {
      console.log("tracksReadOnlyData", tracksReadOnlyData);
      dispatch({ type: types.GET_TRACKS, payload: tracksReadOnlyData });
      removeLoaderHandler && removeLoaderHandler("tracks");
    }
    // eslint-disable-next-line
  }, [removeLoaderHandler]);

  const showDetailedInfoHandler = (e: any) => {
    const dataId = e.target?.closest(".track_container")?.dataset?.id;
    if (dataId) {
      const selectedTrack = tracks.find(
        (track: any) => track?.id?.attributes?.["im:id"] === dataId
      );
      setDetailedInfo({ data: selectedTrack, show: true });
    }
  };

  const addToFav = (addToFavTrack: any) => {
    let modifiedTrackIndex = tracks.findIndex(
      (track: any) =>
        track?.id?.attributes?.["im:id"] ===
        addToFavTrack?.id?.attributes?.["im:id"]
    );

    //track data modify
    const tracksTemp = [...tracks];
    const itemToModify = tracksTemp[modifiedTrackIndex];
    tracksTemp[modifiedTrackIndex] = {
      ...tracksTemp[modifiedTrackIndex],
      isFavorite: tracksTemp[modifiedTrackIndex]?.isFavorite ? false : true,
    };

    dispatch({ type: types.GET_TRACKS, payload: tracksTemp });

    //all data modify
    let dataModifyIndex = tracksReadOnlyData.findIndex(
      (trackItem: any) =>
        trackItem?.id?.attributes?.["im:id"] ===
        itemToModify?.id?.attributes?.["im:id"]
    );

    let modifiedReadData = [...tracksReadOnlyData];
    modifiedReadData[dataModifyIndex] = {
      ...modifiedReadData[dataModifyIndex],
      isFavorite: modifiedReadData[dataModifyIndex]?.isFavorite ? false : true,
    };

    dispatch({
      type: types.GET_INITIAL_TRACKS_DATA,
      payload: modifiedReadData,
    });
    setDetailedInfo({ data: tracksTemp[modifiedTrackIndex], show: true });
  };
  const closeDetailedInfo = () => {
    setDetailedInfo({ data: {}, show: false });
  };

  //favorites checking
  useEffect(() => {
    if (location.pathname === "/all-favorites") {
      setfavoritesFound(tracks.findIndex((track: any) => track.isFavorite));
    }
  }, [location.pathname, tracks]);
  return (
    <>
      {!removeLoaderHandler && isLoading ? (
        <ComponentLoader />
      ) : (
        <>
          <p className="content_heading">
            {location?.pathname === "/all-favorites"
              ? "All Favourites"
              : "Top Albums"}{" "}
          </p>
          <div className="tracks_content" onClick={showDetailedInfoHandler}>
            {tracks?.map((chart: any) => {
              return (
                <>
                  {location?.pathname === "/all-favorites" &&
                  chart?.isFavorite ? (
                    <div
                      key={chart?.id?.attributes?.["im:id"]}
                      className="track_container"
                      data-id={chart?.id?.attributes?.["im:id"]}
                    >
                      <Tile
                        imgSrc={
                          chart?.["im:image"]?.[chart?.["im:image"]?.length - 1]
                            ?.label
                        }
                        imgHeight={
                          chart?.["im:image"]?.[chart?.["im:image"]?.length - 1]
                            ?.attributes?.height
                        }
                        name={chart?.["im:name"]?.label}
                      />
                    </div>
                  ) : null}
                  {location?.pathname !== "/all-favorites" && (
                    <div
                      key={chart?.id?.attributes?.["im:id"]}
                      className="track_container"
                      data-id={chart?.id?.attributes?.["im:id"]}
                    >
                      <Tile
                        imgSrc={
                          chart?.["im:image"]?.[chart?.["im:image"]?.length - 1]
                            ?.label
                        }
                        imgHeight={
                          chart?.["im:image"]?.[chart?.["im:image"]?.length - 1]
                            ?.attributes?.height
                        }
                        name={chart?.["im:name"]?.label}
                      />
                    </div>
                  )}
                </>
              );
            })}

            {/* no data cases */}
            {(!tracks?.length ||
              (location.pathname === "/all-favorites" &&
                favoritesFound === -1)) && (
              <p className="no_data_found">Oops, no data found</p>
            )}
          </div>
        </>
      )}
      {detailedInfo?.show && (
        <TrackInfo
          trackData={detailedInfo?.data}
          closeDetailedInfo={closeDetailedInfo}
          addToFav={addToFav}
        />
      )}
    </>
  );
}

export default React.memo(Tracks);
// type imagesType = { url?: string; width: number; height: number };
