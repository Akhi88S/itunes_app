import React from "react";
import { GiMusicSpell } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import "./component.loader.scss";
function ComponentLogo() {
  const navigate = useNavigate();
  return (
    <div className="logo" onClick={() => navigate("/")}>
      <span className="logo-inner">
        <GiMusicSpell />
      </span>
    </div>
  );
}

export default React.memo(ComponentLogo);
