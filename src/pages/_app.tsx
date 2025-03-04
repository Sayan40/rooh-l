import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import "@/src/app/globals.scss";
import "@/i18n";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
