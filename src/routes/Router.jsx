import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Header from "../layout/Header";
import Portfolios from "../layout/Portfolios";
import PortfoliosPage from "../pages/PortfoliosPage";

function Router() {
  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<PortfoliosPage />} path="/portfolios" />
      </Routes>
    </>
  );
}

export default Router;
