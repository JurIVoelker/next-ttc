import "./globals.css";
import App from "next/app";
import axios from "axios";
import { getStrapiImage } from "../utils/strapi";
import Layout from "../components/Layout/Layout";

export default function MyApp({ Component, pageProps, globalFooterData }) {
  return (
    <Layout global={globalFooterData}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  try {
    const strapiUrl = process.env.STRAPI_URL_LOCAL;
    const response = await axios.get(
      `${strapiUrl}/api/global?populate=*`
    );
    const { joolaLogo, ttcKlingenmuensterLogo } = response.data.data.attributes;
    return {
      ...appProps,
      globalFooterData: {
        joolaLogoURL: getStrapiImage(joolaLogo),
        ttcKlingenmuensterLogoURL: getStrapiImage(ttcKlingenmuensterLogo),
      },
    };
  } catch (error) {
    console.error("Fehler beim Abrufen der Bild-Links:", error);
    return { ...appProps, globalFooterData: [] };
  }
};
