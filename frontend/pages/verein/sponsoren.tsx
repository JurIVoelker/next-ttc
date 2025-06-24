import { getRequest } from "@/utils/strapi";
import { replaceAnchorTagsWithLink } from "@/utils/stringUtils";

type SponsorType = { name?: string; url?: string; text?: string; id: number };
type PageMetaType = {
  title: string;
  text: string;
  sponsors: SponsorType[];
};

const Sponsoren = ({ pageMeta }: { pageMeta: PageMetaType }) => {
  const { title, text, sponsors } = pageMeta;

  return (
    <>
      <h1 className="mb-6">{title}</h1>
      <p className="mb-10">{replaceAnchorTagsWithLink(text)}</p>
      <div className="space-y-6">
        {sponsors?.length > 0 &&
          sponsors.map((sponsor) => (
            <div
              key={sponsor?.id}
              className="outline-1 outline-gray-300 p-4 rounded-lg"
            >
              <h3 className="mb-2">{sponsor?.name}</h3>
              <p className="mb-1">{replaceAnchorTagsWithLink(sponsor?.text)}</p>
              {sponsor?.url && (
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-200"
                >
                  {sponsor.url}
                </a>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default Sponsoren;

export async function getStaticProps() {
  const sponsors: {
    data: {
      attributes: PageMetaType;
    };
  } = await getRequest("sponsor-page?populate=*");
  return {
    props: {
      pageMeta: sponsors?.data?.attributes || [];
    },
    revalidate: 21600,
  };
}
