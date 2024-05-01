// pages/_app.js
import "./globals.css";
import { Inter } from "next/font/google";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
