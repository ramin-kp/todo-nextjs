import React from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarChart,
  faBars,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";

//styles
import styles from "@/styles/header.module.scss";
import Link from "next/link";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__navbar}>
        <h1 className={styles.header__logo}>Next Todo</h1>
        <ul>
          <li>
            <Link href="/">خانه</Link>
          </li>
          <li>
            <Link href="/">داشبورد</Link>
          </li>
          <li>
            <Link href="/">درباه‌ما</Link>
          </li>
        </ul>
        <div>
          <div className={styles.header__login}>ورود | ثبت نام</div>
        </div>
      </nav>
      <div className={styles.header__mobile}>
        <FontAwesomeIcon icon={faBars} className={styles.header__bars} />
        <div>
          <div className={styles.header__login}>ورود | ثبت نام</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
