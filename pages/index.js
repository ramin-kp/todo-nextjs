import React from "react";
import styles from "@/styles/home.module.scss";
import Link from "next/link";
import { verifyToken } from "@/utils/auth";
import usersModel from "@/models/user";
import connectToDB from "@/config/db";

function index({ data }) {
  return (
    <main className={styles.home}>
      {data ? (
        <>
          <h1 className={styles.home__title}>
            سلام {data.firstName} {data.lastName} عزیز به <span>Next Todo</span>{" "}
            خوش آمدید.
          </h1>
          <h2>برای استفاده از امکانات سایت وارد داشبورد خود شوید</h2>

          <Link href="/u-panel" className={styles.header__login}>
            داشبورد
          </Link>
        </>
      ) : (
        <>
          <h1 className={styles.home__title}>
            به <span>Next Todo</span> خوش آمدید لطفا برای استفاده از امکانات
            سایت ثبت نام یا به حساب کاربری خود وارد شوید
          </h1>

          <Link href="/signup" className={styles.header__login}>
            ورود | ثبت نام
          </Link>
        </>
      )}
    </main>
  );
}
export async function getServerSideProps(context) {
  const { Token } = context.req.cookies;

  if (!Token) {
    return {
      props: { data: null },
    };
  }

  connectToDB();

  const verifiedToken = verifyToken(Token);

  if (!verifiedToken) {
    return { props: { data: null } };
  }

  const userData = await usersModel.findOne(
    { email: verifiedToken.email },
    "-__v -password"
  );

  return {
    props: { data: JSON.parse(JSON.stringify(userData)) },
  };
}

export default index;
