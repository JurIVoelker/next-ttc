import Team from "../../components/Team/Team";
import { getRequest } from "../../utils/strapi";

import { MannschaftenPageType, TTAPITeamType } from "../../types/strapiTypes";
import { apiRequest } from "@/utils/apiUtils";

const Mannschaften: React.FC<MannschaftenPageType> = ({
  strapiData,
  teams,
}) => {
  const { titel, mannschaften, altBild } = strapiData.attributes;
  return (
    <>
      <h1 className="mb-6">{titel}</h1>
      {teams.map((team, index) => {
        const image = mannschaften.find(
          (strapiTeam) => strapiTeam.name === team.teamName
        );
        return (
          <Team
            altImage={altBild}
            key={index}
            image={image?.bild}
            players={team.players}
            title={team.teamName}
            imagePosition={index % 2 === 0 ? "left" : "right"}
          />
        );
      })}
    </>
  );
};

export default Mannschaften;

export async function getStaticProps() {
  const mannschaftenData = await getRequest(
    "mannschaften-jugend-page?populate=deep"
  );

  const teams: TTAPITeamType[] = (await apiRequest("/api/v1/players"))
    .playerData;

  return {
    props: {
      strapiData: mannschaftenData.data,
      teams: teams.filter(
        (team) =>
          team.teamName.startsWith("Jungen") ||
          team.teamName.startsWith("Mädchen")
      ),
    },
    revalidate: 600,
  };
}
