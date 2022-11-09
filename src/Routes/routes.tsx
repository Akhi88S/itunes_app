import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";
import SearchBar from "../utils/SearchBar/SearchBar";
import Sidebar from "../components/Sidebar/Sidebar";
import ComponentLogo from "../utils/Loader/component.logo";
import useDimensions from "../utils/hooks/useDimesnions";
import Tracks from "../components/Tracks/Tracks";
import "../components/common.scss";

function RoutesConfiguration() {
  const { isMobile } = useDimensions();

  return (
    <>
      <div className="header">
        {isMobile ? null : <ComponentLogo />}
        <SearchBar />
      </div>
      <div className="sideBar">
        <Sidebar />
      </div>
      <Routes>
        <Route path="/all-categories" element={<Tracks />} />
        <Route path="/all-favorites" element={<Tracks />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default React.memo(RoutesConfiguration);
