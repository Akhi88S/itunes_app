import React from "react";
import { useNavigate } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { HiHashtag } from "react-icons/hi";
// import { BsFillPeopleFill } from "react-icons/bs";
import Accordion from "react-bootstrap/Accordion";
import useDimensions from "../../utils/hooks/useDimesnions";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { types } from "../../Redux/types";
const navigationLinksData = [
  {
    name: "Top Albums",
    path: "/",
    icon: <BiHomeAlt />,
    id: "discover",
  },
  {
    name: "All Favorites",
    path: "/all-favorites",
    icon: <HiHashtag />,
    id: "topCharts",
  },
  // {
  //   name: "Categories",
  //   path: "/all-categories",
  //   icon: <BsFillPeopleFill />,
  //   id: "all-categories",
  // },
];
const Sidebar = (props: sliderBarProps) => {
  const dispatch = useAppDispatch();
  const { tracksReadOnlyData } = useAppSelector(
    (state: any) => state.tracksReducer
  );
  const navigate = useNavigate();
  const { isMobile } = useDimensions();
  const navigationHandler = (path: string, id: string) => {
    navigate(path);
    if (path === "/") {
      dispatch({ type: types.GET_TRACKS, payload: tracksReadOnlyData });
    }
  };

  const NavigationLinksRender = () => {
    return (
      <>
        {navigationLinksData.map((link: any) => {
          return (
            <div
              className={`link-item`}
              key={link.path + Math.random()}
              onClick={() => navigationHandler(link.path, link.id)}
            >
              <>
                <span className="link-icon">{link?.icon}</span>
                <span className="link-name">{link?.name}</span>
              </>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      {isMobile ? (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Discover</Accordion.Header>
            <Accordion.Body>
              <NavigationLinksRender />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ) : (
        <>
          <NavigationLinksRender />
        </>
      )}
    </>
  );
};
export default React.memo(Sidebar);

type sliderBarProps = {
  selectionHandler?: Function;
  selectedItem?: string;
};
