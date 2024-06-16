import styles from "./Team.module.scss";
import ImageTextModule from "../ImageTextModule/ImageTextModule";
import { getStrapiImage } from "../../utils/strapi";

const Team = ({
  image,
  players,
  title,
  myTischtennisLink,
  imagePosition,
  altImage,
}) => {
  const imgSrc = image ? getStrapiImage(image) : getStrapiImage(altImage);
  return (
    <ImageTextModule
      imgSrc={imgSrc}
      imagePosition={imagePosition}
      tags={[
        {
          icon: "link",
          id: 1,
          text: "MyTischtennis Link",
          url: myTischtennisLink,
        },
      ]}
    >
      <h2>{title}</h2>
      {players && (
        <>
          <ol className={styles.players}>
            {players.map((player) => (
              <li key={player.name}>{player.name}</li>
            ))}
          </ol>
        </>
      )}
    </ImageTextModule>
  );
};

export default Team;
