import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState();

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3001/test");

    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    console.log("Fetching Data");
    fetchData();
  }, []);

  return (
    <div className="App">
      <br />
      <Link to="/characters/">
        <div>CHARACTERS</div>
      </Link>
      <br />
      <Link to="/comics/">
        <div>COMICS</div>
      </Link>
      <br />
      <Link to="/favorits/">
        <div>FAVORITS</div>
      </Link>
    </div>
  );
}

export default Home;
