import "./globals.css";
import App from "next/app";
import axios from "axios";
import { getStrapiImage, publicStrapiUrl } from "../utils/strapi";
import Layout from "../components/Layout/Layout";
import Seo from "../components/Seo/Seo";
import { useEffect } from "react";
import { decode } from "jsonwebtoken";

export default function MyApp({ Component, pageProps, globalFooterData }) {
  const seo = pageProps?.strapiData?.data?.attributes?.seo;
  const aktuellesTitle = pageProps?.postData?.attributes?.titel;
  const aktuellesDescription = pageProps?.postData?.attributes?.text;

  useEffect(() => {
    if (typeof localStorage === "undefined") return;
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    const jwtDecoded = decode(jwt);
    if (jwtDecoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwt");
    }
  }, []);

  return (
    <>
      <Seo
        seo={seo}
        title={aktuellesTitle}
        description={aktuellesDescription}
      />
      <Layout global={globalFooterData}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  try {
    const response = await axios.get(
      `${publicStrapiUrl}/api/global?populate=*`,
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
