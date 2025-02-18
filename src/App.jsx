import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="todo-container">
        <h1>To Do list</h1>

        <form>
          <input
            type="text"
            placeholder="Enter your todo"
            disabled={status === " loading"}
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Adding" : "Add Todo"}
          </button>
          <div className="filterButton">
            <input
              type="text"
              placeholder="Enter your search"
              disabled={status === " loading"}
            />
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
