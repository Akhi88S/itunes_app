import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";
import SearchBar from "../utils/SearchBar/SearchBar";
import Sidebar from "../components/Sidebar/Sidebar";
import Tracks from "../components/Tracks/Tracks";
import "../components/common.scss";
import TopArtists from "../components/TopArtists/TopArtists";
import ComponentLogo from "../utils/Loader/component.logo";
function RoutesConfiguration() {
  return (
    <Router>
      <div className="header">
        <ComponentLogo />
        <SearchBar searchStr="" />
      </div>
      <div className="sideBar">
        <Sidebar />
      </div>
      <Routes>
        <Route path="/all-charts" element={<Tracks />} />
        <Route path="/all-artists" element={<TopArtists />} />
        <Route path="/artist-tracks/:name/:id" element={<Tracks />} />
        <Route path="/track-search/:searchItem" element={<Tracks />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default React.memo(RoutesConfiguration);
