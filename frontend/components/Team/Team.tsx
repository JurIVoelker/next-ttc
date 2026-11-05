import styles from "./Team.module.scss";
import ImageTextModule from "../ImageTextModule/ImageTextModule";

const Team = ({ image, players, title, imagePosition, altImage }) => {
  // `image` is undefined when no Strapi team matches; a matched team without
  // a picture (null) shows no image, as in Strapi 4 (where it was { data: null }).
  const img = image !== undefined ? image : altImage;
  return (
    <ImageTextModule
      image={img}
      imagePosition={imagePosition}
      className={styles.imageTextModule}
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
