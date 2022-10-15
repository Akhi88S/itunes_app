import React, { useEffect, useRef, useState } from "react";
import { getTracks, getArtistTracks, getSearchData } from "../../api/music_lib";
import Tile from "../../utils/TileComponent/TileComponent";
import Trackplayer from "../../utils/TrackPlayer/Trackplayer";
import ComponentLoader from "../../utils/Loader/component.loader";

import { useParams } from "react-router-dom";
function Tracks({ removeLoaderHandler }: any) {
  let { name, id, searchItem } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [tracks, setTracks] = useState<topCharts>([{ id: "", name: "" }]);
  const [trackPlaying, setTrackPlaying] = useState<string>("");
  const [trackPaused, setTrackPaused] = useState({
    paused: false,
    showIcon: false,
  });
  const elementRef = useRef(false);

  useEffect(() => {
    const element: any = document.getElementsByClassName(
      "rhap_play-pause-button"
    )[0];
    function callback(mutations: any) {
      let playerMode = mutations[0].target?.["ariaLabel"];
      if (elementRef.current) {
        console.log(playerMode);
        if (playerMode === "Pause") {
          setTrackPaused({ paused: false, showIcon: false });
        } else {
          setTrackPaused({ paused: true, showIcon: true });
        }
      } else {
        elementRef.current = true;
      }
    }
    if (element) {
      let observerOptions = {
        attributes: true,
        attributeFilter: ["aria-label"],
      };
      var observer = new MutationObserver(callback);
      observer.observe(element, observerOptions);
    }
    return () => {
      observer?.disconnect();
    };
  });

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      getArtistTracks(id)
        .then((allTracksData: any) => {
          setTracks(allTracksData);
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.log("err", err);
          setIsLoading(false);
        });
    } else if (searchItem) {
      getSearchData(searchItem)
        .then((searchData: any) => {
          setTracks(searchData);
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.log("err", err);
          setIsLoading(false);
        });
    } else {
      getTracks()
        .then((tracksData: any) => {
          setTracks(tracksData);
          setIsLoading(false);
          removeLoaderHandler && removeLoaderHandler("tracks");
        })
        .catch((err: any) => {
          console.log("err", err);
          setIsLoading(false);
          removeLoaderHandler && removeLoaderHandler("tracks");
        });
    }
  }, [id, searchItem, removeLoaderHandler]);
  return (
    <>
      {!removeLoaderHandler && isLoading ? (
        <ComponentLoader />
      ) : (
        <>
          <p className="content_heading">
            {id
              ? `${name} Charts`
              : searchItem
              ? `Search Results for ${searchItem}`
              : "Top Charts"}{" "}
          </p>
          <div className="tracks_content">
            {tracks?.map((chart: chartDataItem) => {
              return (
                <div key={chart?.id} className="track_container">
                  <Tile
                    imgSrc={chart?.album?.images?.[1]?.url}
                    imgWidth={chart?.album?.images?.[1]?.width}
                    imgHeight={chart?.album?.images?.[1]?.height}
                    name={chart?.name}
                    previewUrl={chart?.preview_url}
                    setTrackPlaying={setTrackPlaying}
                    trackPlaying={trackPlaying}
                    setTrackPaused={setTrackPaused}
                    trackPaused={trackPaused}
                  />
                </div>
              );
            })}
            {!tracks?.length && (
              <p className="no_data_found">Oops, no data found</p>
            )}

            {trackPlaying && <Trackplayer trackUrl={trackPlaying || ""} />}
          </div>
        </>
      )}
    </>
  );
}

export default React.memo(Tracks);
type topCharts = Array<chartDataItem>;
type chartDataItem = {
  id: string;
  name: string;
  album?: albumItem;
  preview_url?: string;
  artists?: Array<any>;
};
type albumItem = {
  id?: string;
  name?: string;
  images?: Array<imagesType>;
};

type imagesType = { url?: string; width: number; height: number };
