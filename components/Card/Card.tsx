import Image from "next/image";
import styles from "./Card.module.scss";
import React from "react";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  isShowMoreVisible?: boolean;
  date?: string;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  isShowMoreVisible,
  date,
}) => {
  return (
    <div className={styles.card}>
      <Image
        src={imageUrl}
        width={300}
        height={200}
        alt={`Bildvorschau für ${title}`}
        className={styles.image}
      ></Image>
      <div className={styles.textContent}>
        <h3>{title}</h3>
        <p>{description}</p>
        {date && <p>{date.split("-").reverse().join(".")}</p>}
      </div>
    </div>
  );
};

export default Card;
