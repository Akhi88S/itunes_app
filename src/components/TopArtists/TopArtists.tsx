import React, { useEffect, useState, useRef } from "react";
import { getArtists } from "../../api/music_lib";
import Tile from "../../utils/TileComponent/TileComponent";
import { useLocation, useNavigate } from "react-router-dom";
import ComponentLoader from "../../utils/Loader/component.loader";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
function TopArtists({ removeLoaderHandler }: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState<artistsData>([
    { id: "NA", name: "NA" },
  ]);
  const artistsContentRef = useRef<any>(null);
  useEffect(() => {
    setIsLoading(true);
    getArtists()
      .then((artistsData: any) => {
        setArtists(artistsData);
        setIsLoading(false);
        removeLoaderHandler && removeLoaderHandler("artists");
      })
      .catch((err: any) => {
        console.log("err", err);
        setIsLoading(false);
        removeLoaderHandler && removeLoaderHandler("artists");
      });
  }, [removeLoaderHandler]);

  const scrollDivHandler = (e: any, isForward: boolean) => {
    if (isForward) {
      artistsContentRef.current.scrollBy({
        top: 0,
        left: +200,
        behavior: "smooth",
      });
    } else {
      artistsContentRef.current.scrollBy({
        top: 0,
        left: -200,
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <p className="content_heading">Top Artists</p>
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <div
          className={`artists_content ${
            pathname === "/all-artists" ? "order_artists" : ""
          }`}
          ref={artistsContentRef}
        >
          {pathname !== "/all-artists" ? (
            <>
              <span
                className="forward_arrow"
                onClick={(e) => scrollDivHandler(e, true)}
              >
                <IoIosArrowForward />
              </span>

              <span
                className="backward_arrow"
                onClick={(e) => scrollDivHandler(e, false)}
              >
                <IoIosArrowBack />
              </span>
            </>
          ) : null}

          {artists?.map((artistData: artistDataItem) => {
            return (
              <div
                key={artistData?.id || ""}
                className="artists_circle"
                onClick={() => {
                  navigate(
                    `/artist-tracks/${artistData?.name}/${artistData?.id}`
                  );
                }}
              >
                <Tile
                  imgSrc={artistData?.images?.[1]?.url}
                  imgWidth={artistData?.images?.[1]?.width}
                  imgHeight={artistData?.images?.[1]?.height}
                  name={artistData?.name}
                  isArtistsPage={true}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default React.memo(TopArtists);
type artistsData = Array<artistDataItem>;
type artistDataItem = {
  id: string;
  name: string;
  images?: Array<imagesType>;
  preview_url?: string;
};

type imagesType = { url?: string; width: number; height: number };
