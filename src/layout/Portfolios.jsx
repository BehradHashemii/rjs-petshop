import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { FaArrowLeft, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { VscGithubProject } from "react-icons/vsc";

import styles from "./Portfolios.module.css";
import formatPersianDate from "../utils/formatPersianDate";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import portfoliosData from "../data/mockData.json";

function Portfolios() {
  const portfolios = portfoliosData.portfolios.slice(-5).reverse();
  const portfolioSlides = portfolios.map((portfolioItem) => (
    <SwiperSlide key={portfolioItem.id}>
      <Link to={`/portfolios/${portfolioItem.id}`}>
        <div className={`${styles.card}`}>
          <div className={styles.info}>
            <p>
              <IoPersonSharp color="#f7763d" />
              {portfolioItem.author}
            </p>
            <p>
              <FaCalendarAlt color="#f7763d" />
              {formatPersianDate(portfolioItem.createdAt || portfolioItem.date)}
            </p>
          </div>
          <p className={styles.title}>{portfolioItem.title}</p>
          <p
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: portfolioItem.description?.slice(0, 100) + "...",
            }}
          ></p>
        </div>
      </Link>
    </SwiperSlide>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.link}>
        <h2>
          <Link to="/portfolios?sort=desc">
            <VscGithubProject style={{ marginLeft: "5px" }} /> آخرین نمونه کار
          </Link>
        </h2>
        <Link to="/portfolios">مشاهده همه</Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination, FreeMode]}
        loop={false}
        spaceBetween={50}
        navigation={{
          clickable: true,
          nextEl: ".scroll-portfolio-button-next",
          prevEl: ".scroll-portfolio-button-prev",
        }}
        pagination={{
          el: "#pagination-portfolio",
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {portfolioSlides}
      </Swiper>
      <div className={styles.swiperButtons}>
        <div className={styles.navigation}>
          <div className="scroll-portfolio-button-prev">
            <FaArrowRight
              color="#f7763d"
              style={{ fontSize: "2rem", cursor: "pointer" }}
            />
          </div>
          <div className="scroll-portfolio-button-next">
            <FaArrowLeft
              color="#f7763d"
              style={{ fontSize: "2rem", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className={styles.pagination}>
          <div id="pagination-portfolio"></div>
        </div>
      </div>
    </div>
  );
}

export default Portfolios;
