import React, { useState } from "react";

//styles
import styles from "@/styles/signup.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { verifyToken } from "@/utils/auth";

function SignIn() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
  });
  const userDataHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userData.identifier.trim() || !userData.password.trim()) {
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
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();

    if (res.status === 200) {
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
        identifier: "",
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
        <h2>خوشحالیم که دوباره به Next Todo آمدید</h2>
        <div className={styles.signUp__form__field}>
          <label htmlFor="identifier">نام کاربری یا ایمیل:</label>
          <input
            type="text"
            name="identifier"
            id="identifier"
            value={userData.identifier}
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
        <button className={styles.signUP__submit__button} type="submit">
          ورود
        </button>
      </form>
      <div className={styles.signup__img}>
        <img src="/images/signup.jpg" alt="signup img" />
      </div>
    </main>
  );
}

export async function getServerSideProps({ req, res }) {
  const { Token } = req.cookies;

  const verifiedToken = verifyToken(Token);
  console.log("verifiedToken", verifiedToken);

  if (Token && verifiedToken) {
    return {
      redirect: { destination: "/u-panel" },
    };
  }

  return {
    props: { data: "" },
  };
}

export default SignIn;
