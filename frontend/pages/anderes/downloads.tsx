import Link from "next/link";
import { getRequest, getStrapiImage } from "../../utils/strapi";
import styles from "./downloads.module.scss";
import { DownloadsPageProps } from "../../types/pageTypes";

const Downloads: React.FC<DownloadsPageProps> = ({ strapiData }) => {
  const { downloads, titel } = strapiData.attributes;

  return (
    <>
      <h1>{titel}</h1>
      <div className={styles.downloads + " mt-8"}>
        {downloads.map((download) =>
          download.__component === "content.file" ? (
            <>
              <Link href={getStrapiImage(download.datei)} key={download.name}>
                {download.name}
              </Link>
            </>
          ) : (
            <Link href={download.link} key={download.name}>
              {download.name}
            </Link>
          )
        )}
      </div>
    </>
  );
};

export default Downloads;

export const getStaticProps = async () => {
  const linksPage = await getRequest(`download-page?populate=deep`);

  return {
    props: {
      strapiData: linksPage.data,
    },
    revalidate: 21600,
  };
};
