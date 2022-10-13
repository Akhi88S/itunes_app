import { useEffect, useState, useRef } from "react";
import RoutesConfiguration from "./Routes/routes";
import { getToken, oAuthToken$ } from "./api/music_lib";
import ThemeSetter from "./ThemeSetter";

function App() {
  const [token, setToken] = useState<string>("");
  let interVal = useRef<any>(null);
  useEffect(() => {
    getToken();
    interVal.current && clearInterval(interVal.current);
    interVal.current = setInterval(() => {
      getToken();
    }, 1000 * 60 * 30); //30mins
    return () => {
      interVal.current && clearInterval(interVal.current);
    };
  }, []);

  useEffect(() => {
    const tokenSubscription = oAuthToken$.subscribe((val: string) =>
      setToken(val)
    );
    return () => {
      tokenSubscription.unsubscribe();
    };
  }, []);
  return (
    <>
      <ThemeSetter />
      <div className="App">{token && <RoutesConfiguration />}</div>
    </>
  );
}

export default App;
