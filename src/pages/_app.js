import Header from "../components/Header";
import { GlobalProvider } from "../context/globalContext";

import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Toaster />
      <Header />
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
