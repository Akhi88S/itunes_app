import React, { useCallback, useEffect, useState } from "react";
import TopArtists from "../TopArtists/TopArtists";
import Tracks from "../Tracks/Tracks";
import ComponentLoader from "../../utils/Loader/component.loader";
function HomePage() {
  const [loaderComponents, setLoaderComponents] = useState([
    "artists",
    "tracks",
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const removeLoaderHandler = useCallback((id: string) => {
    setLoaderComponents((prev) => prev.filter((item: string) => item === id));
  }, []);
  useEffect(() => {
    if (!loaderComponents.length) {
      setIsLoading(false);
    }
  }, [loaderComponents]);
  return (
    <>
      <div className="center_content">
        {isLoading && <ComponentLoader />}
        <TopArtists removeLoaderHandler={removeLoaderHandler} />
        <Tracks removeLoaderHandler={removeLoaderHandler} />
      </div>
    </>
  );
}

export default React.memo(HomePage);
