import "./App.css";
import TodoList from "./components/TodoList";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
