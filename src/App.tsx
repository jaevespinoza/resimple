import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import ApplicationBody from "./components/Body/ApplicationBody";

/**
 * Application to render into the web page.
 * It has the store provider and the body component.
 */
const App = () => {
  return (
    <Provider store={store}>
      <ApplicationBody />
    </Provider>
  );
};

export default App;
