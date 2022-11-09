import RoutesConfiguration from "./Routes/routes";
import ThemeSetter from "./ThemeSetter";
import { Provider } from "react-redux";
import configureStore from "./Redux/store/index";

export const store = configureStore({});
function App() {
  return (
    <Provider store={store}>
      <ThemeSetter />
      <div className="App">{<RoutesConfiguration />}</div>
    </Provider>
  );
}

export default App;
