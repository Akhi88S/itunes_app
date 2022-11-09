import React from "react";
import { GiMusicSpell } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./component.loader.scss";
function ComponentLogo() {
  const location = useLocation();

  const navigate = useNavigate();
  return (
    <>
      {location.pathname !== "/all-favorites" && (
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-inner">
            <GiMusicSpell />
          </span>
        </div>
      )}
    </>
  );
}

export default React.memo(ComponentLogo);
