import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Pagination from "./components/Pagination";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Pagination
        currentPage={4}
        totalPosts={100}
        postsPerPage={10}
        onPageChange={() => {}}
      />
    </>
  );
}

export default App;
