import Image from "next/image";
import styles from "./Team.module.scss";
import ImageTextModule from "../ImageTextModule/ImageTextModule";
import { getStrapiImage } from "../../utils/strapi";

const Team = ({ image, players, title, myTischtennisLink, imagePosition }) => {
  const altImageUrl =
    "http://127.0.0.1:1337/uploads/6_MP_2023_07_24_IMG_8024_446c4d1f9a.jpg";
  const imgSrc = image ? getStrapiImage(image) : altImageUrl;
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
