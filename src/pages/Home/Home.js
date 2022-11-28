import React from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import useTitle from "../../hooks/useTitle";
import Advertise from "./Advertise";
import Banner from "./Banner";
import Categories from "./Categories";
import GuideLine from "./GuideLine";
import Headers from "./Headers";

const Home = () => {
  useTitle("Home");
  useScrollToTop();

  return (
    <div>
      <Headers />
      <Categories />
      <Advertise />
      <GuideLine />
      <Banner />
    </div>
  );
};

export default Home;
