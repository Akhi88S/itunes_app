import React from "react";
import { useNavigate } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { HiHashtag } from "react-icons/hi";
import { BsFillPeopleFill } from "react-icons/bs";
import Accordion from "react-bootstrap/Accordion";
import useDimensions from "../../utils/hooks/useDimesnions";
import { setNavigateToMainPage } from "../../api/music_lib";

const navigationLinksData = [
  {
    name: "Home",
    path: "/",
    icon: <BiHomeAlt />,
    id: "discover",
  },
  {
    name: "All Charts",
    path: "/all-charts",
    icon: <HiHashtag />,
    id: "topCharts",
  },
  {
    name: "All Artists",
    path: "/all-artists",
    icon: <BsFillPeopleFill />,
    id: "topArtists",
  },
];
const Sidebar = (props: sliderBarProps) => {
  const navigate = useNavigate();
  const { isMobile } = useDimensions();
  const navigationHandler = (path: string, id: string) => {
    if (path === "/") {
      setNavigateToMainPage(true);
    }
    navigate(path);
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
