import { AiFillLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./TrackInfo.scss";

const TrackInfo = (props: TrackProps) => {
  const { trackData, closeDetailedInfo, addToFav } = props;
  return (
    <>
      <div className="fade_container"></div>
      <div className="trackInfo_container">
        <div className="img_container">
          <img
            src={
              trackData?.["im:image"]?.[trackData?.["im:image"]?.length - 1]
                ?.label
            }
            height={
              trackData?.["im:image"]?.[trackData?.["im:image"]?.length - 1]
                ?.attributes?.height
            }
            alt={trackData?.title?.label}
          />
        </div>
        <div className="track_details">
          <p>{trackData?.["im:name"]?.label}</p>
          <span className="icon" onClick={() => addToFav(trackData)}>
            {trackData?.isFavorite ? <AiFillLike /> : <BiLike />}
          </span>
          <p>{trackData?.["im:artist"]?.label}</p>
          <p>{trackData?.["im:releaseDate"]?.attributes?.label}</p>
          <p> {trackData?.["im:price"]?.label}</p>
        </div>
        <div className="close_info" onClick={closeDetailedInfo}>
          <AiOutlineCloseCircle />
        </div>
      </div>
    </>
  );
};
export default TrackInfo;

type TrackProps = {
  trackData: any;
  closeDetailedInfo: any;
  addToFav: any;
};
