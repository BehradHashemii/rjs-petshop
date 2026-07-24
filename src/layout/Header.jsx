import { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import styles from "./Header.module.css";
import e2p from "../utils/persianNumber";

import { TiThMenu } from "react-icons/ti";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { Badge } from "@mui/material";
import { FaRegBookmark, FaTimes } from "react-icons/fa";

import {
  getSavedPortfolios,
  getLikedArticles,
  getLoggedUser,
} from "../utils/storage";

function Header({ loggedUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [savedCount, setSavedCount] = useState(
    () => getSavedPortfolios().length,
  );
  const [likedCount, setLikedCount] = useState(() => getLikedArticles().length);

  useEffect(() => {
    const updateCounts = () => {
      setSavedCount(getSavedPortfolios().length);
      setLikedCount(getLikedArticles().length);
      // setCurrentUser(getLoggedUser());
    };

    updateCounts();

    window.addEventListener("portfolio-saved-change", updateCounts);
    window.addEventListener("article-liked-change", updateCounts);
    // window.addEventListener("user-auth-change", updateCounts);

    return () => {
      window.removeEventListener("portfolio-saved-change", updateCounts);
      window.removeEventListener("article-liked-change", updateCounts);
      // window.removeEventListener("user-auth-change", updateCounts);
    };
  }, []);
  return (
    <header className={styles.header}>
      <div className={`${styles.topHeader} glassBG`}>
        <Link to="/">
          <div className={styles.title}>
            <img src="/logo2.png" alt="Behrad-logo" />
            <h1>بهـــــراد</h1>
          </div>
        </Link>

        <div className={styles.searchBox}>
          <CiSearch fontSize="1.3rem" className={styles.searchIcon} />
          <input type="text" placeholder="هرچیزی فکر میکنی رو سرچ کن ..." />
        </div>

        <div className={styles.links}>
          <Badge badgeContent={e2p(savedCount)} color="warning">
            <Link to="/saved?tab=portfolios">
              <FaRegBookmark color="#fff" style={{ fontSize: "1.5rem" }} />
            </Link>
          </Badge>

          <Badge badgeContent={e2p(likedCount)} color="warning">
            <Link to="/saved?tab=articles">
              <IoIosHeartEmpty color="#fff" style={{ fontSize: "1.5rem" }} />
            </Link>
          </Badge>

          <Link to={loggedUser ? "/dashboard" : "/login"}>
            <IoPersonOutline color="#fff" style={{ fontSize: "1.5rem" }} />
          </Link>
        </div>

        {!open ? (
          <TiThMenu
            color="#fff"
            onClick={() => setOpen(true)}
            className={styles.menuToggle}
          />
        ) : (
          <FaTimes
            color="#fff"
            onClick={() => setOpen(false)}
            className={styles.menuToggle}
          />
        )}
      </div>

      <nav className={`${styles.navbar} glassBG ${open ? styles.open : ""}`}>
        {!open && (
          <TiThMenu
            color="#fff"
            onClick={() => setOpen(true)}
            className={styles.menuToggle}
          />
        )}

        <ul>
          <li>
            <NavLink to="/">خانه</NavLink>
          </li>
          <li>
            <NavLink to="/portfolios">نمونه کار</NavLink>
          </li>
          <li>
            <NavLink to="/articles">مقالات</NavLink>
          </li>
          <li>
            <NavLink to="/contact">ارتباط با من</NavLink>
          </li>
          <li>
            <NavLink to="/about-us">درباره من </NavLink>
          </li>
        </ul>

        <div>
          <p>
            <span>شماره تماس:</span>
            <a href="tel:09336699610">۰۹۳۳۶۶۹۹۶۱۰</a>
          </p>
        </div>
      </nav>
    </header>
  );
}

export default Header;
