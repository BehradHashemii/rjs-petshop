import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Portfolios from "../layout/Portfolios";
import PortfoliosPage from "../pages/PortfoliosPage";
import ArticlesPage from "../pages/ArticlesPage";
import ArticleDetailsPage from "../pages/ArticleDetailsPage";

function Router() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<PortfoliosPage />} path="/portfolios" />
      <Route element={<ArticlesPage />} path="/articles" />
      <Route path="/articles/:slug" element={<ArticleDetailsPage />} />
    </Routes>
  );
}

export default Router;
