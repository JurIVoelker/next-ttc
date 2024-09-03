import { getStrapiImage } from "../../utils/strapi";
import Head from "next/head";
import { usePathname } from "next/navigation";

const Seo = ({ seo, title }) => {
  const { metaTitle, metaDescription, metaImage, keywords } = seo || {};
  const pathName = usePathname();
  const isAktuellesPage =
    pathName.split("/").length === 3 && pathName.split("/")[1] === "aktuelles";

  const seoTitle = isAktuellesPage
    ? `${title} | TTC Klingenmünster` || "Aktuelles | TTC Klingenmünster"
    : "TTC Klingenmünster";

  return (
    <Head>
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
