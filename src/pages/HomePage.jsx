import React from "react";
import Banner from "../layout/Banner";
import Carts from "../layout/Carts";
import Articles from "../layout/Articles";
import Portfolios from "../layout/Portfolios";

function HomePage() {
  return (
    <div>
      <Banner></Banner>
      <Carts />
      <Articles />
      <Portfolios />
    </div>
  );
}

export default HomePage;
