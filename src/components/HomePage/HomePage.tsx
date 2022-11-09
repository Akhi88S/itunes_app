import React, { useCallback, useEffect, useState } from "react";
import Tracks from "../Tracks/Tracks";
import ComponentLoader from "../../utils/Loader/component.loader";
function HomePage() {
  const [loaderComponents, setLoaderComponents] = useState(["tracks"]); //total sections in current page
  const [isLoading, setIsLoading] = useState(true);

  //filter out loaded sections
  const removeLoaderHandler = useCallback((id: string) => {
    setLoaderComponents((prev) => prev.filter((item: string) => item !== id));
  }, []);

  //remove primary loader after receving data
  useEffect(() => {
    if (!loaderComponents.length) {
      setIsLoading(false);
    }
  }, [loaderComponents]);

  return (
    <>
      <div className="center_content">
        {isLoading && <ComponentLoader />}
        <Tracks removeLoaderHandler={removeLoaderHandler} />
      </div>
    </>
  );
}

export default React.memo(HomePage);
