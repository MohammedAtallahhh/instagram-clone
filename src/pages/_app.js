import Header from "../components/Header";
import { GlobalProvider } from "../context/globalContext";

import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Header />
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;
