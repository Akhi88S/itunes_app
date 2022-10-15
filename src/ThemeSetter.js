import { useEffect, useState } from "react";
import setTheme from "./utils/utils";
import Form from "react-bootstrap/Form";
import { MdOutlineModeNight } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import ComponentLogo from "./utils/Loader/component.logo";
import useDimensions from "./utils/hooks/useDimesnions";

export default function ThemeSetter() {
  const { isMobile } = useDimensions();

  const [mode, setMode] = useState("dark");
  useEffect(() => {
    setTheme("dark");
  }, []);
  const themeHandler = (e) => {
    let updatedMode = mode !== "dark" ? "dark" : "light";
    setTheme(updatedMode);
    setMode(updatedMode);
  };
  return (
    <div
      className="themeSetter"
      style={{ justifyContent: isMobile ? "space-between" : "flex-end" }}
    >
      {isMobile ? <ComponentLogo /> : null}
      <Form>
        {mode === "dark" && (
          <Form.Label style={{ marginTop: "0.24em" }}>
            <BsSun />
          </Form.Label>
        )}
        <Form.Check
          type="switch"
          id="theme-toggle"
          className="custom-control-input"
          defaultChecked={true}
          onChange={themeHandler}
        />
        {mode === "light" && (
          <Form.Label style={{ marginTop: "0.2em" }}>
            <MdOutlineModeNight />
          </Form.Label>
        )}
      </Form>
    </div>
  );
}
