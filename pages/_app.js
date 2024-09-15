import Footer from "@/components/modules/Footer";
import Header from "@/components/modules/Header";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
