import React, { useEffect } from "react";
import axios from "axios";

const Home: React.FC = () => {
  useEffect(() => {
    axios.get("https://adventofcode.com/2023/day/1/input").then((response) => {
      console.log(response);
    })
  }, [])
  
  return <div>do it</div> ;
};

export default Home;
