import React, { useState } from "react";

//styles

import styles from "@/styles/signup.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function signUp() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    lastName: "",
    firstName: "",
    username: "",
    email: "",
    password: "",
  });
  const userDataHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !userData.lastName.trim() ||
      !userData.firstName.trim() ||
      !userData.username.trim() ||
      !userData.email.trim() ||
      !userData.password.trim()
    ) {
      return toast.error("لطفا فیلد ها رو کامل کنید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();

    if (res.status === 201) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setUserData({
        lastName: "",
        firstName: "",
        username: "",
        email: "",
        password: "",
      });
      router.replace("/");
    } else {
      return toast.error(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <main className={styles.signup}>
      <form className={styles.signup__form} onSubmit={submitHandler}>
        <h2>خوش آمدید</h2>
        <div className={styles.signUp__form__field}>
          <label htmlFor="firstName">نام:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={userData.firstName}
            onChange={userDataHandler}
          />
        </div>
        <div className={styles.signUp__form__field}>
          <label htmlFor="lastName">نام خانوادگی:</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={userData.lastName}
            onChange={userDataHandler}
          />
        </div>
        <div className={styles.signUp__form__field}>
          <label htmlFor="username">نام کاربری:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange={userDataHandler}
          />
        </div>
        <div className={styles.signUp__form__field}>
          <label htmlFor="email">ایمیل:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={userDataHandler}
          />
        </div>
        <div className={styles.signUp__form__field}>
          <label htmlFor="password">رمز عبور:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={userDataHandler}
          />
        </div>
        <button type="submit">ثبت نام</button>
      </form>
      <div className={styles.signup__img}>
        <img src="/images/signup.jpg" alt="signup img" />
      </div>
    </main>
  );
}

export default signUp;
