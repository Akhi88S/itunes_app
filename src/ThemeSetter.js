import { useEffect, useState } from "react";
import setTheme from "./utils/utils";
import Form from "react-bootstrap/Form";
import { MdOutlineModeNight } from "react-icons/md";
import { BsSun } from "react-icons/bs";
export default function ThemeSetter() {
  const [mode, setMode] = useState("light");
  useEffect(() => {
    setTheme("light");
  }, []);
  const themeHandler = (e) => {
    let updatedMode = mode !== "dark" ? "dark" : "light";
    setTheme(updatedMode);
    setMode(updatedMode);
  };
  return (
    <div className="themeSetter">
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
