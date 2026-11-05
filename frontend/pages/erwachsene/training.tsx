import Image from "next/image";
import Training from "../../components/Training/Trainig";
import { ErwachseneTrainingPageProps } from "../../types/pageTypes";
import { getRequest } from "../../utils/strapi";
import { StrapiImage } from "@/components/StrapiImage/StrapiImage";

const Erwachsene: React.FC<ErwachseneTrainingPageProps> = ({ strapiData }) => {
  const trainDates = [
    { title: "Erwachsene", data: strapiData.trainingszeiten },
  ];

  console.log({ additionalInfo: strapiData.additionalInfo });

  return (
    <>
      <Training
        trainDates={trainDates}
        title={strapiData.titel}
        image={strapiData.bild}
        text={strapiData.text}
      />
      {/* Strapi 4 returned { data: null } for an empty media field, so this
          wrapper was always rendered; keep that layout. */}
      {strapiData.additionalInfo !== undefined && (
        <StrapiImage
          img={strapiData.additionalInfo}
          alt="Hobbygruppe Tischtennis"
          className="w-full max-w-200 mt-10 mx-auto rounded-lg shadow-lg"
        />
      )}
    </>
  );
};

export default Erwachsene;

export async function getStaticProps() {
  const erwachseneTrainingData = await getRequest(
    "training-erwachsene-page?populate=deep",
  );

  return {
    props: {
      strapiData: erwachseneTrainingData.data,
    },
    revalidate: 600,
  };
}
