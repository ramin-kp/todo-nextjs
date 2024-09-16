import React from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

//styles
import styles from "@/styles/header.module.scss";
import Link from "next/link";

function Header({ data }) {
  console.log("data",data);
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
        {data ? (
          <Link href="/p-admin" className={styles.header__login}>
            {data.username}
          </Link>
        ) : (
          <Link href="/signup" className={styles.header__login}>
            ورود | ثبت نام
          </Link>
        )}
      </nav>
      <div className={styles.header__mobile}>
        <FontAwesomeIcon icon={faBars} className={styles.header__bars} />
        {data ? (
          <Link href="/p-admin" className={styles.header__login}>
            {data.username}
          </Link>
        ) : (
          <Link href="/signup" className={styles.header__login}>
            ورود | ثبت نام
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
