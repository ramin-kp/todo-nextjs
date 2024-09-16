import Footer from "@/components/modules/Footer";
import Header from "@/components/modules/Header";
import connectToDB from "@/config/db";
import "@/styles/globals.scss";
import { verifyToken } from "@/utils/auth";
import { ToastContainer } from "react-toastify";
import usersModel from "@/models/user";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header data={pageProps.data} />
      <Component {...pageProps} />
      {/* <Footer /> */}
      <ToastContainer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { Token } = context.req.cookies;
  console.log("token", Token);

  if (!Token) {
    return {
      props: { data: null },
    };
  }

  connectToDB();

  const { email } = verifyToken(Token);

  const userData = await usersModel.findOne({ email }, "-__v -password");
  console.log("userDAta", userData);
  console.log("email", email);
  console.log("token", Token);

  return {
    props: { data: JSON.parse(JSON.stringify(userData)) },
  };
}
