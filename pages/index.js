import React from "react";
import styles from "@/styles/home.module.scss";
import Link from "next/link";

function index() {
  return (
    <main className={styles.home}>
      <h1 className={styles.home__title}>
        به <span>Next Todo</span> خوش آمدید لطفا برای استفاده از امکانات سایت
        ثبت نام یا به حساب کاربری خود وارد شوید
      </h1>
      <div className={styles.header__login}>
        <Link href="/signup">ورود | ثبت نام</Link>
      </div>
    </main>
  );
}

export default index;
