import { useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import PostList from "./components/PostList";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <PostList />
      {/* <Pagination
        currentPage={4}
        totalPosts={100}
        postsPerPage={10}
        onPageChange={() => {}}
      /> */}
    </Provider>
  );
}

export default App;
