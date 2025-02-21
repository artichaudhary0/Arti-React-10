import React from "react";
import { useState, useEffect } from "react";

function UseEffectAPI() {
  const [data, setData] = useState([]); // data is not present

  // useEffect :
  useEffect(() => {
    let fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        ); // Promise

        console.log(response);

        const result = await response.json();

        console.log(result);

        setData(result);
      } catch (error) {
        console.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // every render , [] => first render , [count] => count render

  return (
    <div>
      <h2>Fetched data</h2>
      <ul>
        {data.map((datavalue) => (
          <li key={datavalue.id}>{datavalue.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default UseEffectAPI;
