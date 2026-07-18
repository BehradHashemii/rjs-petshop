import React from "react";
import { ImBlog } from "react-icons/im";
import { FaBriefcase, FaPhoneAlt } from "react-icons/fa";

import Cart from "./Cart";
import styles from "./Carts.module.css";
import BackgroundDots from "../components/BackgroundDots";

function Carts() {
  return (
    <div className={styles.Carts}>
      <BackgroundDots></BackgroundDots>
      <Cart title="مقالات" icon={<ImBlog />} bgColor="#F7763D" />
      <Cart title="نمونه کار" icon={<FaBriefcase />} bgColor="#FF9A6C" />
      <Cart title="ارتباط با من" icon={<FaPhoneAlt />} bgColor="#D95724" />
    </div>
  );
}

export default Carts;
