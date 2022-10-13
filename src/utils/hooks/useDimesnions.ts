import { useState, useEffect } from "react";
const useDimensions = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 800) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 800) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return { isMobile };
};

export default useDimensions;
