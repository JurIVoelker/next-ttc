import Image from "next/image";
import styles from "./Card.module.scss";
import React from "react";
import { Button, Link } from "react-aria-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEdit,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  isShowMoreVisible?: boolean;
  date?: string;
  isEditable: boolean;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  isShowMoreVisible,
  date,
  isEditable,
}) => {
  return (
    <div className={styles.card}>
      {isEditable && (
        <div className={styles.adminButtons}>
          <Link href="/">
            <FontAwesomeIcon icon={faPen} color="white" />
          </Link>
          <Link href="/">
            <FontAwesomeIcon icon={faTrash} color="white" />
          </Link>
        </div>
      )}

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
