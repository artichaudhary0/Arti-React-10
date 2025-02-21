import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../feature/ApiSlice";

const FetchDataWithRedux = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  return (
    <div>
      <h1>iksugti</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDataWithRedux;
