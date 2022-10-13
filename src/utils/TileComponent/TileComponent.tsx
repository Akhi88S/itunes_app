import { MdPlayCircleOutline, MdOutlinePauseCircle } from "react-icons/md";
import "./tilecomponent.scss";

const Tile = (props: TileProps) => {
  const {
    imgSrc,
    imgWidth,
    imgHeight,
    name,
    previewUrl,
    setTrackPlaying,
    trackPlaying,
    setTrackPaused,
    trackPaused,
    isArtistsPage,
  } = props;

  const songHandler = (songurl: string) => {
    if (songurl) {
      if (setTrackPlaying) {
        setTrackPlaying(songurl || "");
        setTrackPaused && setTrackPaused({ paused: false, showIcon: false });
      }
    }
  };
  const playSongHandler = (url: string) => {
    songHandler(url);
  };
  const pauseSongHandler = (url: string, isPaused: boolean) => {
    let element: any = document.getElementsByClassName(
      "rhap_play-pause-button"
    )[0];
    element && element.click();
    if (setTrackPaused) {
      if (isPaused) {
        setTrackPaused({ paused: true, showIcon: true });
      } else {
        setTrackPaused({ paused: false, showIcon: false });
      }
    }
  };

  return (
    <div className="tile_container">
      {!isArtistsPage ? (
        <>
          {trackPlaying !== previewUrl ? (
            <span
              className="play_track_icon"
              onClick={() => playSongHandler(previewUrl || "")}
            >
              <MdPlayCircleOutline />
            </span>
          ) : (
            <>
              {trackPaused?.paused || trackPaused?.showIcon ? (
                <span
                  className="play_track_icon_not_hover"
                  onClick={() => pauseSongHandler(previewUrl || "", false)}
                >
                  <MdPlayCircleOutline />
                </span>
              ) : (
                <span
                  className="pause_track_icon_not_hover"
                  onClick={() => pauseSongHandler(previewUrl || "", true)}
                >
                  <MdOutlinePauseCircle />
                </span>
              )}
            </>
          )}
        </>
      ) : null}
      <img
        className="tile_cover"
        src={imgSrc}
        width={imgWidth}
        height={imgHeight}
        alt={name}
        onClick={() => songHandler(previewUrl || "")}
      />
      <p className="tile_name">{name}</p>
    </div>
  );
};
export default Tile;

type TileProps = {
  name: string;
  imgSrc?: string;
  imgWidth?: number;
  imgHeight?: number;
  previewUrl?: string;
  setTrackPlaying?: Function;
  trackPlaying?: string;
  setTrackPaused?: Function;
  trackPaused?: any;
  isArtistsPage?: boolean;
};
