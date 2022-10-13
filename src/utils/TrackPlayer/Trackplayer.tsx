import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

import "./trackplayer.scss";
type TrackPlayerProps = {
  trackUrl: string;
};
function TrackPlayer(props: TrackPlayerProps) {
  const { trackUrl } = props;
  return (
    <>
      <AudioPlayer
        autoPlay
        src={trackUrl}
        className="audio_player"
        showFilledVolume={true}
        defaultCurrentTime="00:00"
        // header={<h5>2</h5>}
      />
    </>
  );
}

export default React.memo(TrackPlayer);
