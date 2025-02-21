import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import FetchDataWithRedux from "./components/FetchDataWithRedux";

function App() {
  return (
    <Provider store={store}>
      <FetchDataWithRedux />
    </Provider>
  );
}

export default App;
