import { getStrapiImage } from "../../utils/strapi";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { removeHtmlTags } from "../../utils/regexs";

const Seo = ({ seo, title, description }) => {
  const { metaTitle, metaDescription, metaImage, keywords } = seo || {};
  const pathName = usePathname();
  const isAktuellesPage =
    pathName.split("/").length === 3 && pathName.split("/")[1] === "aktuelles";

  const seoTitle = isAktuellesPage
    ? `${title} | TTC Klingenmünster` || "Aktuelles | TTC Klingenmünster"
    : "TTC Klingenmünster";

  const seoDescription = removeHtmlTags(description);

  return (
    <Head>
      {process.env.NODE_ENV === "production" && (
        <script
          defer
          src="https://umami.jurivoelker.de/script.js"
          data-website-id="42e46bdc-2ace-4470-b77c-526ed9288f05"
        />
      )}
      {metaTitle && (
        <>
          <title>{metaTitle}</title>
          <meta property="og:title" content={metaTitle} />
        </>
      )}
      {!metaTitle && (
        <>
          <title>{seoTitle}</title>
          <meta property="og:title" content={seoTitle} />
        </>
      )}
      {metaDescription && (
        <>
          <meta name={"description"} content={metaDescription} />
          <meta property={"og:description"} content={metaDescription} />
        </>
      )}
      {!metaDescription && isAktuellesPage && seoDescription && (
        <>
          <meta name={"description"} content={seoDescription} />
          <meta property={"og:description"} content={seoDescription} />
        </>
      )}
      {metaImage && (
        <>
          <meta name={"image"} content={getStrapiImage(metaImage)} />
          <meta property={"og:image"} content={getStrapiImage(metaImage)} />
        </>
      )}
      {keywords && <meta name="keywords" content={keywords}></meta>}
    </Head>
  );
};

export default Seo;
